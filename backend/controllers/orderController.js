import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   Get /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400); // Bad request
      throw new Error('No order Items');
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json({ success: true, createdOrder: createdOrder });
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    GET order by ID
// @route   Get /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'firstName email'
    );

    if (order) {
      res.status(200).json({ success: true, order: order });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    UPDATE order to paid
// @route   Get /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.status(200).json({ success: true, updatedOrder: updatedOrder });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    UPDATE order to delievered
// @route   Get /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.status(200).json({ success: true, updatedOrder: updatedOrder });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc    GET errorged in user orders
// @route   Get /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
  }
});

// @desc    GET all orders
// @route   Get /api/orders/
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id firstName');

    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
  }
});

// @desc    GET all orders
// @route   Get /api/orders/
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne({});
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
      });
    } else {
      res.status(404);
      throw new Error('Order not found!');
    }
  } catch (error) {
    console.error(error);
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
};
