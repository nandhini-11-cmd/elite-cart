import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Buyer is required."],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required."],
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, "Quantity must be at least 1."],
    },

    isSelected: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate cart items
 */
cartSchema.index(
  {
    user: 1,
    product: 1,
  },
  {
    unique: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;