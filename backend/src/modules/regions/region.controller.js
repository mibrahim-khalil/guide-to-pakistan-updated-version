import { Region } from './region.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getRegions = async (req, res, next) => {
  try {
    const regions = await Region.find();
    res.status(200).json(new ApiResponse(200, regions, 'Regions retrieved successfully'));
  } catch (err) {
    next(err);
  }
};

export const getRegionBySlug = async (req, res, next) => {
  try {
    const region = await Region.findOne({ slug: req.params.slug });
    if (!region) throw new ApiError(404, 'Region not found');
    res.status(200).json(new ApiResponse(200, region, 'Region details retrieved'));
  } catch (err) {
    next(err);
  }
};

export const createRegion = async (req, res, next) => {
  try {
    const region = await Region.create(req.body);
    res.status(201).json(new ApiResponse(201, region, 'Region created successfully'));
  } catch (err) {
    next(err);
  }
};

export const updateRegion = async (req, res, next) => {
  try {
    const region = await Region.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!region) throw new ApiError(404, 'Region not found');
    res.status(200).json(new ApiResponse(200, region, 'Region updated successfully'));
  } catch (err) {
    next(err);
  }
};
