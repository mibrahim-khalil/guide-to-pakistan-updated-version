import mongoose from 'mongoose';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';

// Safely obtain User model without hardcoding missing file imports
const getUserModel = () => {
  if (mongoose.models.User) {
    return mongoose.models.User;
  }
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff', 'user'], default: 'user' }
  }, { timestamps: true });
  return mongoose.model('User', userSchema);
};

export const getUsers = async (req, res, next) => {
  try {
    const User = getUserModel();
    const { role, q } = req.query;
    let query = {};
    if (role && role !== 'all') query.role = role;
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ];
    }
    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, users, 'Users loaded successfully'));
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const User = getUserModel();
    const { role } = req.body;
    if (!['admin', 'user', 'staff'].includes(role)) {
      throw new ApiError(400, 'Invalid role specified');
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) throw new ApiError(404, 'User not found');
    res.status(200).json(new ApiResponse(200, user, 'User role updated successfully'));
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const User = getUserModel();
    if (req.user?._id?.toString() === req.params.id) {
      throw new ApiError(400, 'You cannot delete your own active admin account');
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'User account deleted successfully'));
  } catch (err) {
    next(err);
  }
};