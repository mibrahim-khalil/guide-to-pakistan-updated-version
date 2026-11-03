import { Router } from 'express';
import { getPage, updatePage } from './page.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/:name', getPage);
router.put('/:name', protect, updatePage);
export default router;
