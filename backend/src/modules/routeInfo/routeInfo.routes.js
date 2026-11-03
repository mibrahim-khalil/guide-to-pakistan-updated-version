import { Router } from 'express';
import { getRouteInfo } from './routeInfo.controller.js';

const router = Router();

router.post('/info', getRouteInfo);

export default router;