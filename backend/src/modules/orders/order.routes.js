import { Router } from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } from './order.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

// Public route for customers placing orders
router.post('/', createOrder);

// Admin-only protected routes
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

export default router;