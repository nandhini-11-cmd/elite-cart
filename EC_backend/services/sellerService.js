import Product from "../models/Product.js";
import Order from "../models/Order.js";

import { ORDER_STATUS } from "../constants/orderConstants.js";

export const getSellerDashboard = async (sellerId) => {
  // Seller Products
  const products = await Product.find({
    seller: sellerId,
    isActive: true,
  });

  const productIds = products.map((product) => product._id);

  // Orders containing seller's products
  const orders = await Order.find({
    "orderItems.seller": sellerId,
    paymentStatus: "Paid",
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.stock > 0
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 && product.stock <= 5
  ).length;

  let totalRevenue = 0;

  let pendingOrders = 0;
  let confirmedOrders = 0;
let packedOrders = 0;
let outForDeliveryOrders = 0;
  let shippedOrders = 0;
  let deliveredOrders = 0;
  let cancelledOrders = 0;

  for (const order of orders) {
    for (const item of order.orderItems) {
      if (
        item.seller.toString() ===
        sellerId.toString()
      ) {
        totalRevenue += item.subtotal;
      }
    }

    switch (order.orderStatus) {
  case ORDER_STATUS.PENDING:
    pendingOrders++;
    break;

  case ORDER_STATUS.CONFIRMED:
    confirmedOrders++;
    break;

  case ORDER_STATUS.PACKED:
    packedOrders++;
    break;

  case ORDER_STATUS.SHIPPED:
    shippedOrders++;
    break;

  case ORDER_STATUS.OUT_FOR_DELIVERY:
    outForDeliveryOrders++;
    break;

  case ORDER_STATUS.DELIVERED:
    deliveredOrders++;
    break;

  case ORDER_STATUS.CANCELLED:
    cancelledOrders++;
    break;
}
  }

  const recentOrders = orders.slice(0, 5);

  const topSellingProducts = [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 5);

  return {
    totalProducts,
    activeProducts,
    outOfStockProducts,
    lowStockProducts,

    totalOrders: orders.length,

    pendingOrders,
    
    shippedOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,

    recentOrders,

    topSellingProducts,
  };
};