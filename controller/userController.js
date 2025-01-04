const User = require("../modules/UserSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.json(new ApiSuccess(users, "fetch users successfully."));
});

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json(new ApiSuccess(user, "fetch user successfully."));
});

const createUser = asyncHandler(async (req, res) => {
  const user = await User.create({ ...req.body });
  return res.json(new ApiSuccess(user, "user created successfully."));
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req?.body?._id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  if (!user) return new ApiError("user dose not exist.");
  return res.json(new ApiSuccess(user, "user updated successfully."));
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req?.params.userId);
  if (!user) return new ApiError("user dose not exist.");
  return res.json(new ApiSuccess(user, "user deleted successfully."));
});

const controllers = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = controllers;
