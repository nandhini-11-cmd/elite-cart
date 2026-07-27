import api from "./api";

/**
 * Get Cart
 */
export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data.data;
};

/**
 * Add To Cart
 */
export const addToCart = async (
  productId,
  quantity
) => {
  const response = await api.post(
    `/cart/${productId}`,
    {
      quantity,
    }
  );

  return response.data.data;
};

/**
 * Update Quantity
 */
export const updateCartQuantity = async (
  cartId,
  quantity
) => {
  const response = await api.patch(
    `/cart/${cartId}`,
    {
      quantity,
    }
  );

  return response.data.data;
};

/**
 * Remove Item
 */
export const removeCartItem = async (
  cartId
) => {
  const response = await api.delete(
    `/cart/${cartId}`
  );

  return response.data;
};

/**
 * Clear Cart
 */
export const clearCart = async () => {
  const response = await api.delete("/cart");

  return response.data;
};