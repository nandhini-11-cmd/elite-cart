import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { ROLES } from "../constants/roles.js";
import imageSchema from "../schemas/imageSchema.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [3, "Name must be at least 3 characters."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      unique: true,
      match: [
        /^[0-9]{10}$/,
        "Phone number must contain exactly 10 digits.",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters."],
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.BUYER,
    },

    profileImage: {
      type: imageSchema,
      default: () => ({}),
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Hash password before saving
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }

  this.password = await bcrypt.hash(this.password, 10);

  
});

/**
 * Compare entered password with hashed password
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;