import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import regionRoutes from '../modules/regions/region.routes.js';
import placeRoutes from '../modules/places/place.routes.js';
import tourRoutes from '../modules/tours/tour.routes.js';
import bookingRoutes from '../modules/bookings/booking.routes.js';
import storyRoutes from '../modules/stories/story.routes.js';
import mediaRoutes from '../modules/media/media.routes.js';
import inquiryRoutes from '../modules/inquiries/inquiry.routes.js';
import couponRoutes from '../modules/coupons/coupon.routes.js';
import pageRoutes from '../modules/pages/page.routes.js';
import productRoutes from '../modules/products/product.routes.js';
import orderRoutes from '../modules/orders/order.routes.js';
import userRoutes from '../modules/users/user.routes.js';
import settingRoutes from '../modules/settings/setting.routes.js';
import analyticsRoutes from '../modules/analytics/analytics.routes.js';
import routeInfoRoutes from '../modules/routeInfo/routeInfo.routes.js';
import weeklyReportRoutes from '../modules/weeklyReports/weeklyReport.routes.js';

// NEW ROUTES
import routeConditionRoutes from '../modules/routeConditions/routeCondition.routes.js';
import advisoryRoutes from '../modules/advisories/advisory.routes.js';

import { ApiResponse } from '../utils/ApiResponse.js';

const router = Router();

router.get('/health', (req, res) => res.status(200).json(new ApiResponse(200, null, 'GTP API Running')));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/regions', regionRoutes);
router.use('/places', placeRoutes);
router.use('/tours', tourRoutes);
router.use('/bookings', bookingRoutes);
router.use('/stories', storyRoutes);
router.use('/media', mediaRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/coupons', couponRoutes);
router.use('/pages', pageRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/settings', settingRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/route-info', routeInfoRoutes);

// MOUNT NEW ROUTES
router.use('/route-conditions', routeConditionRoutes);
router.use('/advisories', advisoryRoutes);
router.use('/reports', weeklyReportRoutes);

export default router;