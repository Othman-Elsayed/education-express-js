const User = require("../modules/UserSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const data = await User.find({}).select("-password -__v");
  return res.json(new ApiSuccess(data, "Fetch users successfully."));
});
const byId = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.params.id);
  if (!data) return next(new ApiError("Invalid user id."));
  return res.json(new ApiSuccess(data, "Fetch user successfully."));
});
const remove = asyncHandler(async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id);
  if (!data) return next(new ApiError("Invalid user id."));
  return res.json(new ApiSuccess(data, "User updated successfully."));
});
const controllers = {
  getAll,
  byId,
  remove,
};

module.exports = controllers;
