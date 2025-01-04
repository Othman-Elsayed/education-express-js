const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new ApiError("authorization not found."));
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_JWT_TOKEN, (err, decoded) => {
    if (err) return next(new ApiError("invalid token."));
    next();
  });
};

module.exports = verifyToken;
