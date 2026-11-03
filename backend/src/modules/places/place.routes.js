import { Router } from 'express';
import { getPlaces, getPlaceBySlug, createPlace, updatePlace, deletePlace } from './place.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/', getPlaces);
router.get('/:regionSlug/:placeSlug', getPlaceBySlug);
router.post('/', protect, createPlace);
router.put('/:id', protect, updatePlace);
router.delete('/:id', protect, deletePlace);

export default router;
