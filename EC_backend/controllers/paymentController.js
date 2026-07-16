import {
  createPaymentOrder as createPaymentOrderService,
  verifyPayment as verifyPaymentService,
} from "../services/paymentService.js";

import { successResponse } from "../utils/responseHandler.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Create Razorpay Order
 */
export const createPaymentOrder = async (
  req,
  res,
  next
) => {
  try {
    const { orderId } = req.body;

    const paymentOrder =
      await createPaymentOrderService(
        req.user._id,
        orderId
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PAYMENT_ORDER_CREATED,
      paymentOrder
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Verify Payment
 */
export const verifyPayment = async (
  req,
  res,
  next
) => {
  try {
    const order =
      await verifyPaymentService(
        req.user._id,
        req.body
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