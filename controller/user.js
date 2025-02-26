const User = require("../modules/User");
const ApiSuccess = require("../utils/apiSuccess");
const asyncHandler = require("express-async-handler");

const getTeachers = asyncHandler(async (req, res) => {
  let users = await User.find({ role: "teacher" })
    .populate({
      path: "educationSystems",
      select: "name levels -_id",
      populate: {
        path: "levels",
        select: "name description -_id",
      },
    })
    .populate("subjects", "name -_id")
    .exec();
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

const banUser = asyncHandler(async (req, res) => {
  const ban = req.query.ban === "BANED" ? "BANED" : "NOT_BANED";
  const updateUser = await User.findByIdAndUpdate(
    req.query._id,
    { ban },
    { new: true }
  );
  return res.json(new ApiSuccess("user band successfully", updateUser));
});

module.exports = { getTeachers, getStudents, banUser, getById, updateProfile };
