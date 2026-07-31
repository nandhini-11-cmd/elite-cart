import Review from "../models/Review.js";
import Product from "../models/Product.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import Order from "../models/Order.js";
import { ORDER_STATUS } from "../constants/orderConstants.js";

/* -------------------------------------------------------------------------- */
/*                     Update Product Rating Helper                            */
/* -------------------------------------------------------------------------- */

const updateProductRating = async (productId) => {
  const reviews = await Review.find({
    product: productId,
  });

  const totalReviews = reviews.length;

  let averageRating = 0;

  if (totalReviews > 0) {
    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    averageRating = Number(
      (totalRating / totalReviews).toFixed(1)
    );
  }

  await Product.findByIdAndUpdate(productId, {
    averageRating,
    totalReviews,
  });
};

/* -------------------------------------------------------------------------- */
/*                            Add Review                                      */
/* -------------------------------------------------------------------------- */

export const addReview = async (
  userId,
  productId,
  reviewData
) => {
  const { rating, comment } = reviewData;

  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });

 

  if (!product) {
    const error = new Error(
      MESSAGES.PRODUCT_NOT_FOUND
    );

    error.statusCode = STATUS_CODES.NOT_FOUND;

    throw error;
  }


   /**
 * Check Whether User Purchased The Product
 */
const purchasedOrder = await Order.findOne({
  user: userId,
  orderStatus: ORDER_STATUS.DELIVERED,
  "orderItems.product": productId,
});

if (!purchasedOrder) {
  const error = new Error(
    MESSAGES.PRODUCT_NOT_PURCHASED
  );

  error.statusCode =
    STATUS_CODES.FORBIDDEN;

  throw error;
}
  const existingReview = await Review.findOne({
    user: userId,
    product: productId,
  });

  if (existingReview) {
    const error = new Error(
      MESSAGES.REVIEW_ALREADY_EXISTS
    );

    error.statusCode = STATUS_CODES.CONFLICT;

    throw error;
  }

  const review = await Review.create({
    user: userId,
    product: productId,
    rating,
    comment,
  });

  await updateProductRating(productId);

  return review;
};

/* -------------------------------------------------------------------------- */
/*                         Get Product Reviews                                */
/* -------------------------------------------------------------------------- */

export const getProductReviews = async (
  productId
) => {
  const reviews = await Review.find({
    product: productId,
  })
    .populate("user", "name")
    .sort({
      createdAt: -1,
    });

  return reviews;
};

/* -------------------------------------------------------------------------- */
/*                          Update Review                                     */
/* -------------------------------------------------------------------------- */

export const updateReview = async (
  userId,
  reviewId,
  reviewData
) => {
  const review = await Review.findOne({
    _id: reviewId,
    user: userId,
  });

  if (!review) {
    const error = new Error(
      MESSAGES.REVIEW_NOT_FOUND
    );

    error.statusCode = STATUS_CODES.NOT_FOUND;

    throw error;
  }

  if (reviewData.rating !== undefined) {
    review.rating = reviewData.rating;
  }

  if (reviewData.comment) {
    review.comment = reviewData.comment.trim();
  }

  await review.save();

  await updateProductRating(review.product);

  return review;
};

/* -------------------------------------------------------------------------- */
/*                          Delete Review                                     */
/* -------------------------------------------------------------------------- */

export const deleteReview = async (
  userId,
  reviewId
) => {
  const review = await Review.findOne({
    _id: reviewId,
    user: userId,
  });

  if (!review) {
    const error = new Error(
      MESSAGES.REVIEW_NOT_FOUND
    );

    error.statusCode = STATUS_CODES.NOT_FOUND;

    throw error;
  }

  const productId = review.product;

  await review.deleteOne();

  await updateProductRating(productId);

  return true;
};