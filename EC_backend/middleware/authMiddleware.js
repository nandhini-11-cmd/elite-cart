import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Token Not Found
    if (!token) {
      const error = new Error("Access denied. Token not provided.");
      error.statusCode = 401;
      return next(error);
    }

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      return next(error);
    }

    // Check User Status
    if (!user.isActive) {
      const error = new Error("Your account has been deactivated.");
      error.statusCode = 403;
      return next(error);
    }

    // Attach User to Request
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};