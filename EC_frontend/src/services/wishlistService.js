import api from "./api";

/**
 * Get Wishlist
 */
export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return response.data.data;
};

/**
 * Add To Wishlist
 */
export const addToWishlist = async (productId) => {
  const response = await api.post(
    `/wishlist/${productId}`
  );

  return response.data.data;
};

/**
 * Remove Wishlist Item
 */
export const removeWishlistItem = async (
  wishlistId
) => {
  const response = await api.delete(
    `/wishlist/${wishlistId}`
  );

  return response.data;
};