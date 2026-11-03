import { Setting } from './setting.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.status(200).json(new ApiResponse(200, settings, 'Settings loaded'));
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json(new ApiResponse(200, settings, 'Settings updated successfully'));
  } catch (err) {
    next(err);
  }
};