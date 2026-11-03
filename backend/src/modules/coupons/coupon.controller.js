import { Coupon } from './coupon.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getCoupons = async (req, res, next) => {
  try {
    const docs = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, docs, 'Loaded'));
  } catch (e) { next(e); }
};

export const createCoupon = async (req, res, next) => {
  try {
    const doc = await Coupon.create(req.body);
    res.status(201).json(new ApiResponse(201, doc, 'Created'));
  } catch (e) { next(e); }
};

export const validateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase(), status: 'active' });
    if (!coupon) throw new ApiError(404, 'Invalid or inactive coupon');
    if (new Date() > new Date(coupon.expiryDate)) throw new ApiError(400, 'Coupon has expired');
    if (coupon.usedCount >= coupon.usageLimit) throw new ApiError(400, 'Coupon usage limit reached');
    res.status(200).json(new ApiResponse(200, coupon, 'Coupon applied!'));
  } catch (e) { next(e); }
};

export const updateCoupon = async (req, res, next) => {
  try {
    const doc = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(new ApiResponse(200, doc, 'Updated'));
  } catch (e) { next(e); }
};

export const deleteCoupon = async (req, res, next) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Deleted'));
  } catch (e) { next(e); }
};
