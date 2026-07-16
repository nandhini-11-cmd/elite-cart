import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Checkout & Create Order
 */
export const checkout = async (userId) => {
  // Get Selected Cart Items
  const cartItems = await Cart.find({
    user: userId,
    isSelected: true,
  }).populate("product");

  if (!cartItems.length) {
    const error = new Error(MESSAGES.CART_EMPTY);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  const orderItems = [];
  let totalAmount = 0;

  for (const item of cartItems) {
    const product = item.product;

    if (!product || !product.isActive) {
      const error = new Error(MESSAGES.PRODUCT_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      throw error;
    }

    if (product.isOutOfStock || product.stock <= 0) {
      const error = new Error(
        `${product.name} is out of stock.`
      );
      error.statusCode = STATUS_CODES.BAD_REQUEST;
      throw error;
    }

    if (item.quantity > product.stock) {
      const error = new Error(
        `Only ${product.stock} quantity available for ${product.name}.`
      );
      error.statusCode = STATUS_CODES.BAD_REQUEST;
      throw error;
    }

    const finalPrice =
      product.discountPrice > 0
        ? product.discountPrice
        : product.price;

    orderItems.push({
  product: product._id,
  seller: product.seller,
  productName: product.name,
  productImage:
    product.images?.length > 0
      ? product.images[0].url
      : "",

  price: finalPrice,
  quantity: item.quantity,
  subtotal: finalPrice * item.quantity,
});

    totalAmount += finalPrice * item.quantity;
  }

  const order = await Order.create({
  user: userId,

  orderItems,

  shippingAddress: {
    fullName: "Nandhini",
    phone: "9876543210",
    addressLine: "123 Main Street",
    city: "Gobichettipalayam",
    state: "Tamil Nadu",
    pincode: "638452",
    country: "India",
  },

  totalAmount,

  paymentStatus: "Pending",

  orderStatus: "Pending",
});

  return order;
};
/**
 * Get Logged In User Orders
 */
export const getMyOrders = async (userId) => {
  const orders = await Order.find({
    user: userId,
  })
    .populate("orderItems.product")
    .sort({
      createdAt: -1,
    });

  return orders;
};

/**
 * Get Order Details
 */
export const getOrderById = async (
  userId,
  orderId
) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  })
    .populate("orderItems.product")
    .populate("user", "name email phone");

  if (!order) {
    const error = new Error(
      MESSAGES.ORDER_NOT_FOUND
    );

    error.statusCode =
      STATUS_CODES.NOT_FOUND;

    throw error;
  }

  return order;
};

/**
 * Cancel Order
 */
export const cancelOrder = async (
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

  // Only Pending Orders Can Be Cancelled
  if (
    order.orderStatus !== "Pending"
  ) {
    const error = new Error(
      MESSAGES.ORDER_CANNOT_BE_CANCELLED
    );

    error.statusCode =
      STATUS_CODES.BAD_REQUEST;

    throw error;
  }

  order.orderStatus = "Cancelled";

  await order.save();

  return order;
};/**
 * Get Seller Orders
 */
export const getSellerOrders = async (sellerId) => {
  const orders = await Order.find({
    "orderItems.seller": sellerId,
  })
    .populate("user", "name email phone")
    .populate("orderItems.product")
    .sort({
      createdAt: -1,
    });

  return orders;
};



/**
 * Complete Order After Successful Payment
 */
export const completeOrder = async (
  orderId,
  paymentId
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    const error = new Error(
      MESSAGES.ORDER_NOT_FOUND
    );

    error.statusCode =
      STATUS_CODES.NOT_FOUND;

    throw error;
  }

  /**
   * Update Payment
   */
  order.paymentStatus = "Paid";
  order.razorpayPaymentId = paymentId;
  order.orderStatus = "Confirmed";

  /**
   * Reduce Stock
   */
  for (const item of order.orderItems) {
    const product =
      await Product.findById(item.product);

    if (!product) continue;

    product.stock -= item.quantity;

    if (product.stock <= 0) {
      product.stock = 0;
      product.isOutOfStock = true;
    }

    await product.save();
  }

  /**
   * Remove Purchased Cart Items
   */
  await Cart.deleteMany({
    user: order.user,
    isSelected: true,
  });

  await order.save();

  return order;
};


/**
 * Update Order Status
 */
export const updateOrderStatus = async (
  orderId,
  status
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    const error = new Error(
      MESSAGES.ORDER_NOT_FOUND
    );

    error.statusCode =
      STATUS_CODES.NOT_FOUND;

    throw error;
  }

  order.orderStatus = status;

  await order.save();

  return order;
};

                                                                                      