import { RouteCondition } from './routeCondition.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const makeSlug = (text) => String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getRouteConditions = async (req, res, next) => {
  try {
    const { isPublished } = req.query;
    let query = {};
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';
    
    const routes = await RouteCondition.find(query).sort({ updatedAt: -1 });
    res.status(200).json(new ApiResponse(200, routes, 'Route conditions retrieved successfully'));
  } catch (err) { next(err); }
};

export const createRouteCondition = async (req, res, next) => {
  try {
    if (!req.body.slug) req.body.slug = makeSlug(req.body.name);
    const route = await RouteCondition.create(req.body);
    res.status(201).json(new ApiResponse(201, route, 'Route condition created'));
  } catch (err) { next(err); }
};

export const updateRouteCondition = async (req, res, next) => {
  try {
    if (req.body.name && !req.body.slug) req.body.slug = makeSlug(req.body.name);
    const route = await RouteCondition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) throw new ApiError(404, 'Route condition not found');
    res.status(200).json(new ApiResponse(200, route, 'Route condition updated'));
  } catch (err) { next(err); }
};

export const deleteRouteCondition = async (req, res, next) => {
  try {
    const route = await RouteCondition.findByIdAndDelete(req.params.id);
    if (!route) throw new ApiError(404, 'Route condition not found');
    res.status(200).json(new ApiResponse(200, null, 'Route condition deleted'));
  } catch (err) { next(err); }
};