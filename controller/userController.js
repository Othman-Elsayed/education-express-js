const User = require("../modules/UserSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiSuccess");

const getAllUsers = asyncHandler(async (req, res) => {
  const data = await User.find({}).select("-password");
  return res.json(new ApiSuccess(data, "Fetch users successfully."));
});

const getSingleUser = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.params.userId);
  if (!data) return next(new ApiError("Invalid user id."));
  return res.json(new ApiSuccess(data, "Fetch user successfully."));
});
const createUser = asyncHandler(async (req, res) => {
  let payload = { ...req.body };
  let data;
  if (payload.role === "tutor") {
    data = await User.create({ ...payload, studentInfo: null });
  }
  if (payload.role === "student") {
    data = await User.create({ ...payload, tutorInfo: null });
  }
  if (payload.role === "admin") {
    data = await User.create(payload);
  }
  return res.json(new ApiSuccess(data, "User created successfully."));
});

const updateUser = asyncHandler(async (req, res) => {
  let payload = { ...req.body };
  if (payload.role === "student") {
    payload = { ...payload, tutorInfo: null };
  }
  if (payload.role === "tutor") {
    payload = { ...payload, studentInfo: null };
  }
  let data = await User.findByIdAndUpdate(payload._id, payload, { new: true });
  return res.json(new ApiSuccess(data, "User updated successfully."));
});

const deleteUser = asyncHandler(async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.userId);
  if (!data) return next(new ApiError("Invalid user id."));
  return res.json(new ApiSuccess(data, "User updated successfully."));
});
const controllers = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = controllers;
