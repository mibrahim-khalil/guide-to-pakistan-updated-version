import { Advisory } from './advisory.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getAdvisories = async (req, res, next) => {
  try {
    const { isPublished, activeOnly } = req.query;
    let query = {};

    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    // FIX: Include null/empty validUntil so active advisories without expiry dates are returned!
    if (activeOnly === 'true') {
      query.$or = [
        { validUntil: { $exists: false } },
        { validUntil: null },
        { validUntil: { $gte: new Date() } }
      ];
    }

    const advisories = await Advisory.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, advisories, 'Advisories retrieved'));
  } catch (err) { 
    next(err); 
  }
};

export const createAdvisory = async (req, res, next) => {
  try {
    const advisory = await Advisory.create(req.body);
    res.status(201).json(new ApiResponse(201, advisory, 'Advisory created'));
  } catch (err) { 
    next(err); 
  }
};

export const updateAdvisory = async (req, res, next) => {
  try {
    const advisory = await Advisory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!advisory) throw new ApiError(404, 'Advisory not found');
    res.status(200).json(new ApiResponse(200, advisory, 'Advisory updated'));
  } catch (err) { 
    next(err); 
  }
};

export const deleteAdvisory = async (req, res, next) => {
  try {
    const advisory = await Advisory.findByIdAndDelete(req.params.id);
    if (!advisory) throw new ApiError(404, 'Advisory not found');
    res.status(200).json(new ApiResponse(200, null, 'Advisory deleted'));
  } catch (err) { 
    next(err); 
  }
};