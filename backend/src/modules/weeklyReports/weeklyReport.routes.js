import { Router } from 'express';
import { 
  getReports, 
  getLatestReport, 
  getReportById, 
  createReport, 
  updateReport, 
  deleteReport 
} from './weeklyReport.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

// Public routes
router.get('/latest', getLatestReport);
router.get('/:id', getReportById);
router.get('/', getReports);

// Admin protected routes
router.post('/', protect, createReport);
router.put('/:id', protect, updateReport);
router.delete('/:id', protect, deleteReport);

export default router;