const User = require("../modules/User");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ error: "Access Denied. No Token Provided!" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);
    const user = await User.findById(verified._id);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token!" });
  }
  // const token = req.cookies.token;
  // if (!token) {
  //   return next(new ApiError("Unauthorized: User not authenticated", 401));
  // }
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  //   const user = await User.findById(decoded.id);
  //   if (!user) {
  //     return next(new ApiError("Unauthorized: User not found", 401));
  //   }
  //   req.user = user;
  //   next();
  // } catch (err) {
  //   if (err.name === "TokenExpiredError") {
  //     const refreshToken = req.cookies.refreshToken;
  //     if (refreshToken) {
  //       try {
  //         const newToken = await refreshAccessToken(refreshToken);
  //         res.cookie("token", newToken, {
  //           httpOnly: true,
  //           secure: process.env.NODE_ENV === "production",
  //         });
  //         return next();
  //       } catch (refreshError) {
  //         console.error("Token refresh failed:", refreshError);
  //       }
  //     }
  //   }
  //   res.clearCookie("token");
  //   return next(new ApiError("Unauthorized: Invalid token", 401));
  // }
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
