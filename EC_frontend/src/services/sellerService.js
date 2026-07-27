import api from "./api";

/**
 * Dashboard
 */
export const getSellerDashboard = async () => {
  const response = await api.get("/seller/dashboard");

  return response.data.data;
};

/**
 * Seller Products
 */
export const getSellerProducts = async (
  page = 1,
  limit = 10
) => {
  const response = await api.get(
    `/products/seller/my-products?page=${page}&limit=${limit}`
  );

  return response.data.data;
};

/**
 * Delete Product
 */
export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};