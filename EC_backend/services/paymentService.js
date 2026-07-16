import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Create Razorpay Order
 */
export const createPaymentOrder = async (
  userId,
  orderId
) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    const error = new Error(
      MESSAGES.ORDER_NOT_FOUND
    );

    error.statusCode =
      STATUS_CODES.NOT_FOUND;

    throw error;
  }
console.log("Payment Status:", order.paymentStatus);
  console.log("Is Paid:", order.paymentStatus === "Paid");
  if (order.paymentStatus === "Paid") {
    const error = new Error(
      MESSAGES.ORDER_ALREADY_PAID
    );

    error.statusCode =
      STATUS_CODES.BAD_REQUEST;

    throw error;
  }

  const razorpayOrder =
    await razorpay.orders.create({
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    });

  order.razorpayOrderId =
    razorpayOrder.id;

  await order.save();

  return razorpayOrder;
};
import crypto from "crypto";

import { completeOrder } from "./orderService.js";

/**
 * Verify Razorpay Payment
 */
export const verifyPayment = async (
  userId,
  paymentData
) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = paymentData;

  /**
   * Find Order
   */
  const order = await Order.findOne({
    user: userId,
    razorpayOrderId: razorpay_order_id,
  });

  if (!order) {
    const error = new Error(
      MESSAGES.ORDER_NOT_FOUND
    );

    error.statusCode =
      STATUS_CODES.NOT_FOUND;

    throw error;
  }

  /**
   * Already Paid
   */
  
  if (order.paymentStatus === "Paid") {
    const error = new Error(
      MESSAGES.ORDER_ALREADY_PAID
    );

    error.statusCode =
      STATUS_CODES.BAD_REQUEST;

    throw error;
  }

  /**
   * Verify Signature
   */
  const generatedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(
      `${razorpay_order_id}|${razorpay_payment_id}`
    )
    .digest("hex");

  if (
    generatedSignature !==
    razorpay_signature
  ) {
    const error = new Error(
      MESSAGES.INVALID_PAYMENT_SIGNATURE
    );

    error.statusCode =
      STATUS_CODES.BAD_REQUEST;

    throw error;
  }

  /**
   * Save Payment Details
   */
  order.paymentId =
    razorpay_payment_id;

  order.paymentSignature =
    razorpay_signature;

  await order.save();

  /**
   * Complete Order
   */
  const updatedOrder =
    await completeOrder(
      order._id,
      razorpay_payment_id
    );

  return updatedOrder;
};