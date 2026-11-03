import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './product.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
export default router;
