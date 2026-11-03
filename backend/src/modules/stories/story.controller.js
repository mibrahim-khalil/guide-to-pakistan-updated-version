import { Story } from './story.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const makeSlug = (text) =>
  String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const getStories = async (req, res, next) => {
  try {
    const { category, featured, q, status } = req.query;
    let query = {};

    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.featured = true;
    if (status && status !== 'all') query.status = status;

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { subtitle: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
      ];
    }

    const stories = await Story.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, stories, 'Stories retrieved successfully'));
  } catch (err) {
    next(err);
  }
};

export const getStoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const cleanSlug = String(slug || '').toLowerCase().trim();

    let story = await Story.findOne({
      $or: [
        { slug: cleanSlug },
        { slug: { $regex: new RegExp(`^${cleanSlug}$`, 'i') } },
        { _id: cleanSlug.match(/^[0-9a-fA-F]{24}$/) ? cleanSlug : null },
      ],
    });

    if (!story) throw new ApiError(404, 'Story not found');
    res.status(200).json(new ApiResponse(200, story, 'Story retrieved successfully'));
  } catch (err) {
    next(err);
  }
};

export const createStory = async (req, res, next) => {
  try {
    if (!req.body.slug) {
      req.body.slug = makeSlug(req.body.title);
    }
    const story = await Story.create(req.body);
    res.status(201).json(new ApiResponse(201, story, 'Story created successfully'));
  } catch (err) {
    next(err);
  }
};

export const updateStory = async (req, res, next) => {
  try {
    if (req.body.title && !req.body.slug) {
      req.body.slug = makeSlug(req.body.title);
    }
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!story) throw new ApiError(404, 'Story not found');
    res.status(200).json(new ApiResponse(200, story, 'Story updated successfully'));
  } catch (err) {
    next(err);
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) throw new ApiError(404, 'Story not found');
    res.status(200).json(new ApiResponse(200, null, 'Story deleted successfully'));
  } catch (err) {
    next(err);
  }
};
