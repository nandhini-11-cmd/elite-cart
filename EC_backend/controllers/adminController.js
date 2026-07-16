import { getAdminDashboard } from "../services/adminService.js";
import { successResponse } from "../utils/responseHandler.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

export const dashboard = async ( req, res, next) => 
  {
  try {
    const data =
      await getAdminDashboard();

    return successResponse(
      res,
      STATUS_CODES.SUCCESS,
      MESSAGES.ADMIN_DASHBOARD_FETCHED,
      data
    );
  } catch (error) {
    next(error);
  }
};