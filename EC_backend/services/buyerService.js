import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";
import Order from "../models/Order.js";

import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "../constants/orderConstants.js";

export const getBuyerDashboard = async (userId) => {
  const [
    cartCount,
    wishlistCount,
    totalOrders,
    pendingOrders,
    confirmedOrders,
    packedOrders,
    outForDeliveryOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    recentOrders,
    orders,
  ] = await Promise.all([
    // Cart Count
    Cart.countDocuments({ user: userId }),

    // Wishlist Count
    Wishlist.countDocuments({ user: userId }),

    // Total Orders
    Order.countDocuments({ user: userId }),

    // Pending Orders
    Order.countDocuments({
      user: userId,
      orderStatus: ORDER_STATUS.PENDING,
    }),

    // Confirmed Orders
    Order.countDocuments({
      user: userId,
      orderStatus: ORDER_STATUS.CONFIRMED,
    }),

    // Packed Orders
    Order.countDocuments({
      user: userId,
      orderStatus: ORDER_STATUS.PACKED,
    }),

    // Out For Delivery Orders
    Order.countDocuments({
      user: userId,
      orderStatus: ORDER_STATUS.OUT_FOR_DELIVERY,
    }),

    // Shipped Orders
    Order.countDocuments({
      user: userId,
      orderStatus: ORDER_STATUS.SHIPPED,
    }),

    // Delivered Orders
    Order.countDocuments({
      user: userId,
      orderStatus: ORDER_STATUS.DELIVERED,
    }),

    // Cancelled Orders
    Order.countDocuments({
      user: userId,
      orderStatus: ORDER_STATUS.CANCELLED,
    }),

    // Recent Orders
    Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("orderItems.product"),

    // Paid Orders (for Total Spent)
    Order.find({
      user: userId,
      paymentStatus: PAYMENT_STATUS.PAID,
    }),
  ]);

  // Total Amount Spent
  const totalSpent = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return {
    cartCount,
    wishlistCount,

    totalOrders,

    pendingOrders,
    confirmedOrders,
    packedOrders,
    outForDeliveryOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,

    totalSpent,

    recentOrders,
  };
};  