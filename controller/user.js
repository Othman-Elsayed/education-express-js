const User = require("../modules/User");
const ApiSuccess = require("../utils/apiSuccess");
const asyncHandler = require("express-async-handler");

const getTeachers = asyncHandler(async (req, res) => {
  let users = await User.find({ role: "teacher" });
  return res.json(new ApiSuccess("fetch users successfully", users));
});
const getStudents = asyncHandler(async (req, res) => {
  let users = await User.find({ role: "student" });
  return res.json(new ApiSuccess("fetch users successfully", users));
});
const getById = asyncHandler(async (req, res) => {
  let user = await User.findOne({ _id: req.query._id });
  return res.json(new ApiSuccess("fetch users successfully", user));
});

const updateProfile = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    bio,
    address,
    phoneNumber,
    country,
    educationSystems,
    subjects,
    img,
    video,
  } = req.body;
  const _id = req.user._id;

  let user = await User.findOne({ _id });

  let payload = {
    name,
    email,
    bio,
    address,
    phoneNumber,
    country,
    img,
  };

  if (user.role === "teacher") {
    payload = {
      ...payload,
      educationSystems,
      subjects,
      video,
    };
  }
  const updateUser = await User.findByIdAndUpdate(_id, payload, { new: true });
  return res.json(new ApiSuccess("fetch users successfully", updateUser));
});

module.exports = { getTeachers, getStudents, getById, updateProfile };
