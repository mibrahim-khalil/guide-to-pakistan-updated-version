import { Router } from 'express';
import { getAdvisories, createAdvisory, updateAdvisory, deleteAdvisory } from './advisory.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/', getAdvisories);
router.post('/', protect, createAdvisory);
router.put('/:id', protect, updateAdvisory);
router.delete('/:id', protect, deleteAdvisory);

export default router;