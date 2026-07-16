import {
  addReview as addReviewService,
  getProductReviews as getProductReviewsService,
  updateReview as updateReviewService,
  deleteReview as deleteReviewService,
} from "../services/reviewService.js";

import { successResponse } from "../utils/responseHandler.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Add Review
 */
export const addReview = async (req, res, next) => {
  try {
    const review = await addReviewService(
      req.user._id,
      req.params.productId,
      req.body
    );

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.REVIEW_CREATED,
      review
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get Product Reviews
 */
export const getProductReviews = async (
  req,
  res,
  next
) => {
  try {
    const reviews =
      await getProductReviewsService(
        req.params.productId
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.REVIEWS_FETCHED,
      reviews
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update Review
 */
export const updateReview = async (
  req,
  res,
  next
) => {
  try {
    const review =
      await updateReviewService(
        req.user._id,
        req.params.reviewId,
        req.body
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.REVIEW_UPDATED,
      review
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Review
 */
export const deleteReview = async (
  req,
  res,
  next
) => {
  try {
    await deleteReviewService(
      req.user._id,
      req.params.reviewId
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.REVIEW_DELETED
    );
  } catch (error) {
    next(error);
  }
};