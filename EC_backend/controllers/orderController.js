import {
  checkout as checkoutService,
  getMyOrders as getMyOrdersService,
  getOrderById as getOrderByIdService,
  cancelOrder as cancelOrderService,
  getSellerOrders as getSellerOrdersService,
  updateOrderStatus as updateOrderStatusService,
  completeOrder as completeOrderService,
} from "../services/orderService.js";

import { successResponse } from "../utils/responseHandler.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Checkout
 */
export const checkout = async (req, res, next) => {
  try {
    const order = await checkoutService(req.user._id);

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.ORDER_CREATED,
      order
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get My Orders
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await getMyOrdersService(req.user._id);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.ORDERS_FETCHED,
      orders
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Order Details
 */
export const getOrder = async (req, res, next) => {
  try {
    const order = await getOrderByIdService(
      req.user._id,
      req.params.id
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.ORDER_FETCHED,
      order
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel Order
 */
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await cancelOrderService(
      req.user._id,
      req.params.id
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.ORDER_CANCELLED,
      order
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Seller Orders
 */
export const getSellerOrders = async (req, res, next) => {
  try {
    const orders = await getSellerOrdersService(
      req.user._id
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.ORDERS_FETCHED,
      orders
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update Order Status
 */
export const updateOrderStatus = async (
  req,
  res,
  next
) => {
  try {
    const order = await updateOrderStatusService(
      req.params.id,
      req.body.status
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.ORDER_UPDATED,
      order
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Complete Payment
 */
export const completeOrder = async (
  req,
  res,
  next
) => {
  try {
    const { paymentId } = req.body;

    const order = await completeOrderService(
      req.params.id,
      paymentId
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PAYMENT_SUCCESS,
      order
    );
  } catch (error) {
    next(error);
  }
};