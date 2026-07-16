import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";

import { ROLES } from "../constants/roles.js";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "../constants/orderConstants.js";

export const getAdminDashboard = async () => {
  const [
    totalUsers,
    totalBuyers,
    totalSellers,
    totalAdmins,

    totalCategories,

    totalProducts,
    activeProducts,
    outOfStockProducts,

    totalOrders,
    pendingOrders,
    confirmedOrders,
    packedOrders,
    outForDeliveryOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,

    paidOrders,

    recentUsers,
    recentOrders,
  ] = await Promise.all([
    // Users
    User.countDocuments(),

    User.countDocuments({
      role: ROLES.BUYER,
    }),

    User.countDocuments({
      role: ROLES.SELLER,
    }),

    User.countDocuments({
      role: ROLES.ADMIN,
    }),

    // Categories
    Category.countDocuments({
      isActive: true,
    }),

    // Products
    Product.countDocuments({
      isActive: true,
    }),

    Product.countDocuments({
      isActive: true,
      stock: { $gt: 0 },
    }),

    Product.countDocuments({
      isActive: true,
      stock: 0,
    }),

    // Orders
    Order.countDocuments(),

    Order.countDocuments({
      orderStatus: ORDER_STATUS.PENDING,
    }),

    Order.countDocuments({
      orderStatus: ORDER_STATUS.CONFIRMED,
    }),

    Order.countDocuments({
      orderStatus: ORDER_STATUS.PACKED,
    }),

    Order.countDocuments({
      orderStatus: ORDER_STATUS.OUT_FOR_DELIVERY,
    }),

    Order.countDocuments({
      orderStatus: ORDER_STATUS.SHIPPED,
    }),

    Order.countDocuments({
      orderStatus: ORDER_STATUS.DELIVERED,
    }),

    Order.countDocuments({
      orderStatus: ORDER_STATUS.CANCELLED,
    }),

    // Paid Orders
    Order.find({
      paymentStatus: PAYMENT_STATUS.PAID,
    }),

    // Recent Users
    User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5),

    // Recent Orders
    Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  const totalRevenue = paidOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return {
    totalUsers,
    totalBuyers,
    totalSellers,
    totalAdmins,

    totalCategories,

    totalProducts,
    activeProducts,
    outOfStockProducts,

    totalOrders,
    pendingOrders,
    confirmedOrders,
    packedOrders,
    outForDeliveryOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,

    recentUsers,
    recentOrders,
  };
};