import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

import {
  validateRegister,
  validateLogin,
} from "../validators/authValidator.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * Register User
 */
export const registerUser = async (userData) => {
  const { name, email, phone, password, role } = userData;

  // Validate Input
  const validationError = validateRegister({
    name,
    email,
    phone,
    password,
  });

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  // Check Email
  const existingEmail = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingEmail) {
    const error = new Error("Email already exists.");
    error.statusCode = STATUS_CODES.CONFLICT;
    throw error;
  }

  // Check Phone
  const existingPhone = await User.findOne({
    phone,
  });

  if (existingPhone) {
    const error = new Error("Phone number already exists.");
    error.statusCode = STATUS_CODES.CONFLICT;
    throw error;
  }

  // Create User
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  const token = generateToken(user._id, user.role);

  return {
    token,
    user,
  };
};

/**
 * Login User
 */
export const loginUser = async ({ email, password }) => {
  // Validate Input
  const validationError = validateLogin({
    email,
    password,
  });

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!user) {
    const error = new Error(MESSAGES.INVALID_CREDENTIALS);
    error.statusCode = STATUS_CODES.UNAUTHORIZED;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error(MESSAGES.ACCOUNT_DEACTIVATED);
    error.statusCode = STATUS_CODES.FORBIDDEN;
    throw error;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new Error(MESSAGES.INVALID_CREDENTIALS);
    error.statusCode = STATUS_CODES.UNAUTHORIZED;
    throw error;
  }

  const token = generateToken(user._id, user.role);

  user.password = undefined;

  return {
    token,
    user,
  };
};

/**
 * Get Profile
 */
export const getProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error(MESSAGES.USER_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  return user;
};

/**
 * Update Profile
 */
export const updateProfile = async (userId, updateData) => {
  const { name, phone, profileImage } = updateData;

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error(MESSAGES.USER_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  // Phone Duplicate Check
  if (phone && phone !== user.phone) {
    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      const error = new Error("Phone number already exists.");
      error.statusCode = STATUS_CODES.CONFLICT;
      throw error;
    }

    user.phone = phone;
  }

  if (name) {
    user.name = name;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  await user.save();

  return user;
};

/**
 * Change Password
 */
export const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    const error = new Error(MESSAGES.USER_NOT_FOUND);
    error.statusCode = STATUS_CODES.NOT_FOUND;
    throw error;
  }

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    const error = new Error("Current password is incorrect.");
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  user.password = newPassword;

  await user.save();

  return true;
};