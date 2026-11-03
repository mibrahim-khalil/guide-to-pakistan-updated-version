import { Router } from 'express';
import { getRegions, getRegionBySlug, createRegion, updateRegion } from './region.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/', getRegions);
router.get('/:slug', getRegionBySlug);
router.post('/', protect, createRegion);
router.put('/:slug', protect, updateRegion);

export default router;
