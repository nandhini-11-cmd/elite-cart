import mongoose from "mongoose";

const recentlyViewedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required."],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate recently viewed products
 */
recentlyViewedSchema.index(
  {
    user: 1,
    product: 1,
  },
  {
    unique: true,
  }
);

const RecentlyViewed = mongoose.model(
  "RecentlyViewed",
  recentlyViewedSchema
);

export default RecentlyViewed;