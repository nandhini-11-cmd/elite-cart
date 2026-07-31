import api from "./api";

/**
 * Get Product Reviews
 */
export const getProductReviews = async (productId) => {
  const response = await api.get(
    `/reviews/${productId}`
  );

  return response.data.data;
};

/**
 * Add Review
 */
export const addReview = async (
  productId,
  reviewData
) => {
  const response = await api.post(
    `/reviews/${productId}`,
    reviewData
  );

  return response.data.data;
};

/**
 * Update Review
 */
export const updateReview = async (
  reviewId,
  reviewData
) => {
  const response = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );

  return response.data.data;
};

/**
 * Delete Review
 */
export const deleteReview = async (
  reviewId
) => {
  const response = await api.delete(
    `/reviews/${reviewId}`
  );

  return response.data;
};