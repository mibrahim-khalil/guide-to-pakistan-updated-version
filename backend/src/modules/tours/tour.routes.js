import { Router } from 'express';
import { getTours, getTourBySlug, createTour, updateTour, deleteTour } from './tour.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

router.get('/', getTours);
router.get('/:slug', getTourBySlug);
router.post('/', protect, createTour);
router.put('/:id', protect, updateTour);
router.delete('/:id', protect, deleteTour);

export default router;
