import { Router } from 'express';
import { upload, uploadImage, getMedia, getMediaById, deleteMedia } from './media.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

// Public receipt upload (checkout)
router.post('/upload-receipt', upload.single('image'), uploadImage);

// Admin uploads
router.post('/upload', protect, upload.single('image'), uploadImage);

// Admin library
router.get('/', protect, getMedia);
router.get('/:id', protect, getMediaById);
router.delete('/:id', protect, deleteMedia);

export default router;