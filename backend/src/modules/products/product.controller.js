import { Product } from './product.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const slugify = (text) => String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getProducts = async (req, res, next) => {
  try {
    const { category, q, status } = req.query;
    let query = {};
    if (category && category !== 'all') query.category = category;
    if (status && status !== 'all') query.status = status;
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ];
    }
    const docs = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, docs, 'Products loaded'));
  } catch (e) { next(e); }
};

export const getProductById = async (req, res, next) => {
  try {
    const doc = await Product.findById(req.params.id);
    if (!doc) throw new ApiError(404, 'Product not found');
    res.status(200).json(new ApiResponse(200, doc, 'Product loaded'));
  } catch (e) { next(e); }
};

export const createProduct = async (req, res, next) => {
  try {
    if (!req.body.slug) req.body.slug = slugify(req.body.name);
    const doc = await Product.create(req.body);
    res.status(201).json(new ApiResponse(201, doc, 'Product created'));
  } catch (e) { next(e); }
};

export const updateProduct = async (req, res, next) => {
  try {
    if (req.body.name && !req.body.slug) req.body.slug = slugify(req.body.name);
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) throw new ApiError(404, 'Product not found');
    res.status(200).json(new ApiResponse(200, doc, 'Product updated'));
  } catch (e) { next(e); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Product deleted'));
  } catch (e) { next(e); }
};
