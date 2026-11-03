import { Order } from '../orders/order.model.js';
import { Booking } from '../bookings/booking.model.js';
import { Inquiry } from '../inquiries/inquiry.model.js';
import { Tour } from '../tours/tour.model.js';
import { Product } from '../products/product.model.js';
import mongoose from 'mongoose';
import { ApiResponse } from '../../utils/ApiResponse.js';

const getUserModel = () => {
  return mongoose.models.User || mongoose.model('User', new mongoose.Schema({}));
};

export const getAnalyticsStats = async (req, res, next) => {
  try {
    const User = getUserModel();

    // 1. Parallel Aggregations
    const [
      orders,
      bookings,
      inquiriesCount,
      totalUsers,
      toursCount,
      productsCount
    ] = await Promise.all([
      Order.find({ orderStatus: { $ne: 'cancelled' } }),
      Booking.find ? Booking.find({ status: { $ne: 'cancelled' } }) : Promise.resolve([]),
      Inquiry.countDocuments ? Inquiry.countDocuments({ status: 'unread' }) : Promise.resolve(0),
      User.countDocuments ? User.countDocuments() : Promise.resolve(0),
      Tour.countDocuments ? Tour.countDocuments() : Promise.resolve(0),
      Product.countDocuments ? Product.countDocuments() : Promise.resolve(0),
    ]);

    // 2. Revenue Calculations
    const shopRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const bookingRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || b.amount || 0), 0);
    const totalRevenue = shopRevenue + bookingRevenue;

    // 3. Order Status Breakdown
    const orderStatusCounts = {
      pending: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
    };
    orders.forEach(o => {
      if (orderStatusCounts[o.orderStatus] !== undefined) {
        orderStatusCounts[o.orderStatus]++;
      }
    });

    // 4. Payment Method Breakdown
    const paymentMethods = {
      cod: 0,
      easypaisa: 0,
      jazzcash: 0,
      bank_transfer: 0,
    };
    orders.forEach(o => {
      if (paymentMethods[o.paymentMethod] !== undefined) {
        paymentMethods[o.paymentMethod]++;
      }
    });

    // 5. Recent Activity Stream
    const recentOrders = orders.slice(0, 5).map(o => ({
      id: o._id,
      type: 'product_order',
      number: o.orderNumber,
      customer: o.customerName,
      amount: o.totalAmount,
      status: o.orderStatus,
      createdAt: o.createdAt,
    }));

    res.status(200).json(new ApiResponse(200, {
      summary: {
        totalRevenue,
        shopRevenue,
        bookingRevenue,
        totalOrders: orders.length,
        totalBookings: bookings.length,
        unreadInquiries: inquiriesCount,
        totalUsers,
        totalTours: toursCount,
        totalProducts: productsCount,
      },
      orderStatusCounts,
      paymentMethods,
      recentOrders,
    }, 'Analytics stats retrieved successfully'));
  } catch (err) {
    next(err);
  }
};