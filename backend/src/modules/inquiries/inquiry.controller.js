import { Inquiry } from './inquiry.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';

export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      throw new ApiError(400, 'Name, email, and message are required');
    }
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(new ApiResponse(201, inquiry, 'Inquiry submitted successfully!'));
  } catch (err) {
    next(err);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, inquiries, 'Inquiries retrieved'));
  } catch (err) {
    next(err);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!inquiry) throw new ApiError(404, 'Inquiry not found');
    res.status(200).json(new ApiResponse(200, inquiry, 'Status updated'));
  } catch (err) {
    next(err);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Inquiry deleted'));
  } catch (err) {
    next(err);
  }
};