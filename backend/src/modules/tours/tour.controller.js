import { Tour } from './tour.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const makeSlug = (text) => String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getTours = async (req, res, next) => {
  try {
    const { region, featured, difficulty, q, status } = req.query;
    let query = {};
    
    if (region) query.regionSlug = region;
    if (featured === 'true') query.featured = true;
    if (difficulty) query.difficulty = difficulty;
    if (status && status !== 'all') query.status = status;
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { regionName: { $regex: q, $options: 'i' } },
        { startingLocation: { $regex: q, $options: 'i' } }
      ];
    }

    const tours = await Tour.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, tours, 'Tours retrieved successfully'));
  } catch (err) { next(err); }
};

export const getTourBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const cleanSlug = String(slug || '').toLowerCase().trim();

    let tour = await Tour.findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: new RegExp(`^${cleanSlug}$`, 'i') } },
        { _id: cleanSlug.match(/^[0-9a-fA-F]{24}$/) ? cleanSlug : null }
      ]
    });

    if (!tour) throw new ApiError(404, 'Tour package not found');
    res.status(200).json(new ApiResponse(200, tour, 'Tour package retrieved'));
  } catch (err) { next(err); }
};

export const createTour = async (req, res, next) => {
  try {
    if (!req.body.slug) {
      req.body.slug = makeSlug(req.body.title);
    }
    const tour = await Tour.create(req.body);
    res.status(201).json(new ApiResponse(201, tour, 'Tour package created successfully'));
  } catch (err) { next(err); }
};

export const updateTour = async (req, res, next) => {
  try {
    if (req.body.title && !req.body.slug) {
      req.body.slug = makeSlug(req.body.title);
    }
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tour) throw new ApiError(404, 'Tour package not found');
    res.status(200).json(new ApiResponse(200, tour, 'Tour package updated successfully'));
  } catch (err) { next(err); }
};

export const deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) throw new ApiError(404, 'Tour package not found');
    res.status(200).json(new ApiResponse(200, null, 'Tour package deleted successfully'));
  } catch (err) { next(err); }
};
