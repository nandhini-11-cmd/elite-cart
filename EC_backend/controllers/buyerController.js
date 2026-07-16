import { getBuyerDashboard } from "../services/buyerService.js";

import { successResponse } from "../utils/responseHandler.js";

import { STATUS_CODES } from "../constants/statusCodes.js";

export const dashboard = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await getBuyerDashboard(
        req.user._id
      );

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      "Buyer dashboard fetched successfully.",
      data
    );
  } catch (error) {
    next(error);
  }
};