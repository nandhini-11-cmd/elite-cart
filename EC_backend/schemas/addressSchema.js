import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Full name cannot exceed 50 characters."],
    },

    phone: {
      type: String,
      required: true,
      match: [
        /^[0-9]{10}$/,
        "Phone number must contain exactly 10 digits.",
      ],
    },

    addressLine: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Address cannot exceed 200 characters."],
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, "Pincode must contain exactly 6 digits."],
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

export default addressSchema;