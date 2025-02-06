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
  let user = await User.findOne({ _id: req.query.id });
  return res.json(new ApiSuccess("fetch users successfully", user));
});

module.exports = { getTeachers, getStudents, getById };
