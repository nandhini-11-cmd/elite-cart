import { registerUser,loginUser,getProfile,updateProfile,changePassword,} from "../services/authService.js";

import { successResponse } from "../utils/responseHandler.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

export const register = async (req, res, next) => {
  try {
    const data = await registerUser(req.body);

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      MESSAGES.REGISTER_SUCCESS,
      data
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.LOGIN_SUCCESS,
      data
    );
  } catch (error) {
    next(error);
  }
};

export const profile = async (req, res, next) => {
  try {
    const user = await getProfile(req.user._id);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PROFILE_FETCHED,
      user
    );
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await updateProfile(req.user._id, req.body);

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PROFILE_UPDATED,
      user
    );
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePassword(
      req.user._id,
      currentPassword,
      newPassword
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.PASSWORD_CHANGED
    );
  } catch (error) {
    next(error);
  }
};