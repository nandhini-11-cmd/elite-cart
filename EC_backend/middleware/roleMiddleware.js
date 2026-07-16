export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      // Check whether user exists
      if (!req.user) {
        const error = new Error("Authentication required.");
        error.statusCode = 401;
        return next(error);
      }

      // Check user role
      if (!roles.includes(req.user.role)) {
        const error = new Error(
          "You are not authorized to access this resource."
        );
        error.statusCode = 403;
        return next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};