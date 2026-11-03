import { Router } from 'express';
import { getCoupons, createCoupon, validateCoupon, updateCoupon, deleteCoupon } from './coupon.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/', protect, getCoupons);
router.post('/', protect, createCoupon);
router.get('/validate/:code', validateCoupon);
router.put('/:id', protect, updateCoupon);
router.delete('/:id', protect, deleteCoupon);
export default router;
