import { Place } from './place.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const makeSlug = (text) => String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getPlaces = async (req, res, next) => {
  try {
    const { region, q, status } = req.query;
    let query = {};
    if (region) query.regionSlug = region;
    if (status && status !== 'all') query.status = status;
    if (q) {
      query.$or = [{ name: { $regex: q, $options: 'i' } }, { regionName: { $regex: q, $options: 'i' } }];
    }
    const places = await Place.find(query).sort({ name: 1 });
    res.status(200).json(new ApiResponse(200, places, 'Places retrieved successfully'));
  } catch (err) { next(err); }
};

export const getPlaceBySlug = async (req, res, next) => {
  try {
    const { regionSlug, placeSlug } = req.params;
    // Case insensitive search to prevent 404s
    let place = await Place.findOne({ 
      slug: { $regex: new RegExp(`^${placeSlug}$`, 'i') } 
    });
    if (!place) throw new ApiError(404, 'Place not found');
    res.status(200).json(new ApiResponse(200, place, 'Place retrieved'));
  } catch (err) { next(err); }
};

export const createPlace = async (req, res, next) => {
  try {
    if (!req.body.slug) req.body.slug = makeSlug(req.body.name);
    const place = await Place.create(req.body);
    res.status(201).json(new ApiResponse(201, place, 'Place created successfully'));
  } catch (err) { next(err); }
};

export const updatePlace = async (req, res, next) => {
  try {
    if (!req.body.slug) req.body.slug = makeSlug(req.body.name);
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!place) throw new ApiError(404, 'Place not found');
    res.status(200).json(new ApiResponse(200, place, 'Place updated successfully'));
  } catch (err) { next(err); }
};

export const deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) throw new ApiError(404, 'Place not found');
    res.status(200).json(new ApiResponse(200, null, 'Place deleted successfully'));
  } catch (err) { next(err); }
};
