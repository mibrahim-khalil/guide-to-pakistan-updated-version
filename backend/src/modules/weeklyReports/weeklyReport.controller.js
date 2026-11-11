import { WeeklyReport } from './weeklyReport.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

// Get all reports (for list views)
export const getReports = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;

    const reports = await WeeklyReport.find(query)
      .sort({ weekEndDate: -1 })
      .populate('bestDestinations', 'name slug hero.image hero.risk regionName'); // Get place details
      
    res.status(200).json(new ApiResponse(200, reports, 'Reports retrieved'));
  } catch (err) { next(err); }
};

// Get the SINGLE LATEST published report (for the TISS page teaser)
export const getLatestReport = async (req, res, next) => {
  try {
    const report = await WeeklyReport.findOne({ status: 'published' })
      .sort({ weekEndDate: -1 })
      .populate('bestDestinations', 'name slug hero.image hero.risk regionName');
      
    res.status(200).json(new ApiResponse(200, report, 'Latest report retrieved'));
  } catch (err) { next(err); }
};

// Get one report by ID
export const getReportById = async (req, res, next) => {
  try {
    const report = await WeeklyReport.findById(req.params.id)
      .populate('bestDestinations', 'name slug hero.image hero.risk regionName');
      
    if (!report) throw new ApiError(404, 'Report not found');
    res.status(200).json(new ApiResponse(200, report, 'Report retrieved'));
  } catch (err) { next(err); }
};

// Manual CRUD (Create, Update, Delete) for Admin adjustments
export const createReport = async (req, res, next) => {
  try {
    const report = await WeeklyReport.create(req.body);
    res.status(201).json(new ApiResponse(201, report, 'Report created'));
  } catch (err) { next(err); }
};

export const updateReport = async (req, res, next) => {
  try {
    const report = await WeeklyReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) throw new ApiError(404, 'Report not found');
    res.status(200).json(new ApiResponse(200, report, 'Report updated'));
  } catch (err) { next(err); }
};

export const deleteReport = async (req, res, next) => {
  try {
    const report = await WeeklyReport.findByIdAndDelete(req.params.id);
    if (!report) throw new ApiError(404, 'Report not found');
    res.status(200).json(new ApiResponse(200, null, 'Report deleted'));
  } catch (err) { next(err); }
};