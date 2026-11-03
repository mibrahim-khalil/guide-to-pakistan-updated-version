import { Router } from 'express';
import { getAnalyticsStats } from './analytics.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/stats', protect, getAnalyticsStats);

export default router;