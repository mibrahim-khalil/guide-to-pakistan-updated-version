import { Order } from './order.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const createOrder = async (req, res, next) => {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, items } = req.body;
    
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items?.length) {
      throw new ApiError(400, 'Customer details, shipping address, and items are required');
    }

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    const shippingCost = req.body.shippingCost !== undefined ? req.body.shippingCost : 300;
    const discount = req.body.discount || 0;
    const totalAmount = Math.max(0, subtotal + shippingCost - discount);

    // Automatically flag payments awaiting manual verification
    let paymentStatus = 'unpaid';
    if (['easypaisa', 'jazzcash', 'bank_transfer'].includes(req.body.paymentMethod)) {
      paymentStatus = req.body.paymentDetails?.receiptImage ? 'pending_verification' : 'unpaid';
    }

    const order = await Order.create({
      ...req.body,
      subtotal,
      shippingCost,
      discount,
      totalAmount,
      paymentStatus,
    });

    res.status(201).json(new ApiResponse(201, order, 'Order placed successfully!'));
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus, q } = req.query;
    let query = {};

    if (orderStatus && orderStatus !== 'all') query.orderStatus = orderStatus;
    if (paymentStatus && paymentStatus !== 'all') query.paymentStatus = paymentStatus;
    
    if (q) {
      query.$or = [
        { orderNumber: { $regex: q, $options: 'i' } },
        { customerName: { $regex: q, $options: 'i' } },
        { customerEmail: { $regex: q, $options: 'i' } },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, orders, 'Orders fetched successfully'));
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new ApiError(404, 'Order not found');
    res.status(200).json(new ApiResponse(200, order, 'Order retrieved successfully'));
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) throw new ApiError(404, 'Order not found');
    res.status(200).json(new ApiResponse(200, order, 'Order updated successfully'));
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) throw new ApiError(404, 'Order not found');
    res.status(200).json(new ApiResponse(200, null, 'Order deleted successfully'));
  } catch (err) {
    next(err);
  }
};