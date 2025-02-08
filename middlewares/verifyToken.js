const User = require("../modules/User");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ApiError("Unauthorized: User not authenticated", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ApiError("Unauthorized: User not found"));
    }
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return next(new ApiError("Unauthorized: Invalid token"));
  }
};

const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError("Unauthorized: User not authenticated", 401));
    }
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return next(
        new ApiError(
          "Forbidden: You do not have permission to access this resource",
          403
        )
      );
    }
  };
};

module.exports = { verifyToken, verifyRole };
