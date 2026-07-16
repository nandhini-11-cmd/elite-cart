import { getSellerDashboard } from "../services/sellerService.js";

import { successResponse } from "../utils/responseHandler.js";

import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

export const dashboard = async (
  req,
  res,
  next
) => {
  try {
    const data = await getSellerDashboard(
      req.user._id
    );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.SELLER_DASHBOARD_FETCHED,
      data
    );
  } catch (error) {
    next(error);
  }
};