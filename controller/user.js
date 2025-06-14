const User = require("../modules/User");
const ApiSuccess = require("../utils/apiSuccess");
const asyncHandler = require("express-async-handler");

const getTeachers = asyncHandler(async (req, res) => {
  const {
    page,
    size,
    search,
    subjects = [],
    levels = [],
    systems = [],
  } = req.query;
  const filter = { role: "teacher" };

  const convertToArray = (str) => str?.split(",") || [];

  if (subjects.length > 0) {
    filter.subjects = { $in: convertToArray(subjects) };
  }

  if (levels.length > 0) {
    filter.levels = { $in: convertToArray(levels) };
  }

  if (systems.length > 0) {
    filter.educationSystems = {
      $in: convertToArray(systems),
    };
  }
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  let users = await User.find(filter)
    .populate({
      path: "educationSystems",
      select: "name levels -_id",
      populate: {
        path: "levels",
        select: "name description -_id",
      },
    })
    .populate("subjects levels img")
    .exec();

  return res.json(new ApiSuccess("fetch users successfully", users));
});

const getStudents = asyncHandler(async (req, res) => {
  let users = await User.find({ role: "student" }).populate("img");
  return res.json(new ApiSuccess("fetch users successfully", users));
});

const getById = asyncHandler(async (req, res) => {
  let user = await User.findOne({ _id: req.query._id })
    .populate("img")
    .populate({
      path: "subjects levels",
      select: "name fileName",
      populate: {
        path: "img",
        select: "fileName",
      },
    })
    .populate({
      path: "educationSystems",
      select: "name img levels",
      populate: {
        path: "levels img",
        select: "name fileName",
      },
    });
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
    levels,
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
    levels,
  };

  if (user.role === "teacher") {
    payload = {
      ...payload,
      educationSystems,
      subjects,
      video,
    };
  }
  const updateUser = await User.findByIdAndUpdate(_id, payload, { new: true })
    .populate("img")
    .populate({
      path: "subjects levels",
      select: "name fileName",
      populate: {
        path: "img",
        select: "fileName",
      },
    })
    .populate({
      path: "educationSystems",
      select: "name img levels",
      populate: {
        path: "levels img",
        select: "name fileName",
      },
    });
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
