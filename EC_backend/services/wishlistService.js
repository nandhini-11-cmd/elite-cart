import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Add Product To Wishlist
 */
export const addToWishlist = async (
  userId,
  productId
) => {
  // Validate Product
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

  // Check Duplicate
  const existingWishlist =
    await Wishlist.findOne({
      user: userId,
      product: productId,
    });

  if (existingWishlist) {
    const error = new Error(
      MESSAGES.PRODUCT_ALREADY_IN_WISHLIST
    );

    error.statusCode =
      STATUS_CODES.CONFLICT;

    throw error;
  }

  const wishlist =
    await Wishlist.create({
      user: userId,
      product: productId,
    });

  return wishlist;
};

/**
 * Get Wishlist
 */
export const getWishlist = async (
  userId
) => {
  return await Wishlist.find({
    user: userId,
  })
    .populate({
      path: "product",
      populate: {
        path: "category",
        select: "categoryName",
      },
    })
    .sort({
      createdAt: -1,
    });
};

/**
 * Remove Wishlist Item
 */
export const removeWishlistItem =
  async (userId, wishlistId) => {
    const wishlist =
      await Wishlist.findOne({
        _id: wishlistId,
        user: userId,
      });

    if (!wishlist) {
      const error = new Error(
        MESSAGES.WISHLIST_NOT_FOUND
      );

      error.statusCode =
        STATUS_CODES.NOT_FOUND;

      throw error;
    }

    await wishlist.deleteOne();

    return true;
  };