import { Router } from 'express';
import { loginAdmin, getMe } from './auth.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.post('/login', loginAdmin);
router.get('/me', protect, getMe);

export default router;
