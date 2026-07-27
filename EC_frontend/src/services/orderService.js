import api from "./api";

/**
 * Checkout
 */
export const checkout = async (
  shippingAddress,
  paymentMethod
) => {
  const response = await api.post(
    "/orders/checkout",
    {
      shippingAddress,
      paymentMethod,
    }
  );

  return response.data.data;
};

export const verifyPayment = async (
  paymentData
) => {
  const response = await api.post(
    "/payment/verify",
    paymentData
  );

  return response.data.data;
};
/**
 * Get My Orders
 */
export const getMyOrders = async () => {
  const response = await api.get(
    "/orders/my-orders"
  );

  return response.data.data;
};
/**
 * Get Order Details
 */
export const getOrderById = async (
  orderId
) => {
  const response = await api.get(
    `/orders/${orderId}`
  );

  return response.data.data;
};

/**
 * Cancel Order
 */
export const cancelOrder = async (
  orderId
) => {
  const response = await api.patch(
    `/orders/${orderId}/cancel`
  );

  return response.data.data;
};
export const getSellerOrders = async () => {
  const response = await api.get(
    "/orders/seller/orders"
  );

  return response.data.data;
};

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await api.patch(
    `/orders/${orderId}/status`,
    { status }
  );

  return response.data.data;
};