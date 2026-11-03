import { Router } from 'express';
import { getRouteConditions, createRouteCondition, updateRouteCondition, deleteRouteCondition } from './routeCondition.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();
router.get('/', getRouteConditions);
router.post('/', protect, createRouteCondition);
router.put('/:id', protect, updateRouteCondition);
router.delete('/:id', protect, deleteRouteCondition);

export default router;