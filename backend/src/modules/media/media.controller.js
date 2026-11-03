import { Media } from './media.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Local disk storage (works without Cloudinary)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new ApiError(400, 'Only image files are allowed'), false);
  },
});

// Upload single image and save to DB
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'No image file provided');

    // Prefer Cloudinary-style response if your existing code sets it
    let url = req.file.path;
    let publicId = req.file.filename;

    // If you already use Cloudinary in middleware, url may be on req.file.path or req.body
    // Build a public URL for local uploads
    if (!url.startsWith('http')) {
      const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
      url = `${base}/uploads/${req.file.filename}`;
    }

    const media = await Media.create({
      url,
      publicId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      folder: req.body.folder || 'general',
      alt: req.body.alt || req.file.originalname,
      uploadedBy: req.user?._id,
    });

    res.status(201).json(new ApiResponse(201, media, 'Image uploaded successfully'));
  } catch (err) {
    next(err);
  }
};

// List media with search + folder filter
export const getMedia = async (req, res, next) => {
  try {
    const { q, folder } = req.query;
    const query = {};
    if (folder && folder !== 'all') query.folder = folder;
    if (q) {
      query.$or = [
        { originalName: { $regex: q, $options: 'i' } },
        { alt: { $regex: q, $options: 'i' } },
        { filename: { $regex: q, $options: 'i' } },
      ];
    }
    const items = await Media.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, items, 'Media loaded'));
  } catch (err) {
    next(err);
  }
};

// Get single media
export const getMediaById = async (req, res, next) => {
  try {
    const item = await Media.findById(req.params.id);
    if (!item) throw new ApiError(404, 'Media not found');
    res.status(200).json(new ApiResponse(200, item, 'Media loaded'));
  } catch (err) {
    next(err);
  }
};

// Delete media
export const deleteMedia = async (req, res, next) => {
  try {
    const item = await Media.findById(req.params.id);
    if (!item) throw new ApiError(404, 'Media not found');

    // Delete local file if exists
    if (item.filename) {
      const filePath = path.join(process.cwd(), 'uploads', item.filename);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (_) {}
      }
    }

    await Media.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Media deleted'));
  } catch (err) {
    next(err);
  }
};