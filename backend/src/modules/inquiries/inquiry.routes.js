import { Router } from 'express';
import { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry } from './inquiry.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

router.post('/', createInquiry); // Public submit
router.get('/', protect, getInquiries); // Admin list
router.put('/:id', protect, updateInquiryStatus); // Admin status change
router.delete('/:id', protect, deleteInquiry); // Admin delete

export default router;