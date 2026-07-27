import api from "./api";

/**
 * Create Razorpay Order
 */
export const createPaymentOrder = async (
  orderId
) => {
  const response = await api.post(
    "/payment/create-order",
    {
      orderId,
    }
  );

  return response.data.data;
};

/**
 * Verify Razorpay Payment
 */
export const verifyPayment = async (
  paymentData
) => {
  const response = await api.post(
    "/payment/verify",
    paymentData
  );

  return response.data.data;
};