import { Router } from 'express';
import { getSettings, updateSettings } from './setting.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

router.get('/', getSettings); // Public read (for checkout & footer)
router.put('/', protect, updateSettings); // Admin update

export default router;