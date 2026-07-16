import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Add Product To Cart
 */
export const addToCart = async (
  userId,
  productId,
  quantity = 1
) => {
  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });

  if (!product) {
    const error = new Error(MESSAGES.PRODUCT_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  if (product.isOutOfStock || product.stock <= 0) {
    const error = new Error(MESSAGES.PRODUCT_OUT_OF_STOCK);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  const existingCart = await Cart.findOne({
    user: userId,
    product: productId,
  });

  if (existingCart) {
    const totalQuantity =
      existingCart.quantity + Number(quantity);

    if (totalQuantity > product.stock) {
      const error = new Error(
        MESSAGES.INSUFFICIENT_STOCK
      );

      error.statusCode = STATUS_CODES.BAD_REQUEST;

      throw error;
    }

    existingCart.quantity = totalQuantity;

    await existingCart.save();

    return existingCart;
  }

  const cart = await Cart.create({
    user: userId,
    product: productId,
    quantity,
  });

  return cart;
};

/**
 * Get Cart
 */
export const getCart = async (userId) => {
  const cartItems = await Cart.find({
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

  let grandTotal = 0;

  const items = cartItems.map((item) => {
    const price =
      item.product.discountPrice > 0
        ? item.product.discountPrice
        : item.product.price;

    const total = price * item.quantity;

    grandTotal += total;

    return {
      ...item.toObject(),
      unitPrice: price,
      totalPrice: total,
    };
  });

  return {
    items,
    grandTotal,
  };
};
/**
 * Update Cart Quantity
 */
export const updateCartQuantity = async (
  userId,
  cartId,
  quantity
) => {
  quantity = Number(quantity);

  if (Number.isNaN(quantity) || quantity < 1) {
    const error = new Error(MESSAGES.INVALID_QUANTITY);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  const cart = await Cart.findOne({
    _id: cartId,
    user: userId,
  }).populate("product");

  if (!cart) {
    const error = new Error(MESSAGES.CART_ITEM_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  if (!cart.product.isActive) {
    const error = new Error(MESSAGES.PRODUCT_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  if (quantity > cart.product.stock) {
    const error = new Error(MESSAGES.INSUFFICIENT_STOCK);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  cart.quantity = quantity;

  await cart.save();

  return cart;
};

/**
 * Remove Cart Item
 */
export const removeCartItem = async (
  userId,
  cartId
) => {
  const cart = await Cart.findOne({
    _id: cartId,
    user: userId,
  });

  if (!cart) {
    const error = new Error(MESSAGES.CART_ITEM_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  await cart.deleteOne();

  return true;
};

/**
 * Clear Cart
 */
export const clearCart = async (userId) => {
  await Cart.deleteMany({
    user: userId,
  });

  return true;
};

/**
 * Select / Unselect Cart Item
 */
export const toggleCartSelection = async (
  userId,
  cartId
) => {
  const cart = await Cart.findOne({
    _id: cartId,
    user: userId,
  });

  if (!cart) {
    const error = new Error(MESSAGES.CART_ITEM_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  cart.isSelected = !cart.isSelected;

  await cart.save();

  return cart;
};