const Student = require("../modules/StudentSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  let data = await Student.find({})
    .populate("gradeLevel schoolSystem", "name img")
    .select("-__v");
  return res.json(new ApiSuccess(data, "Fetch students successfully."));
});
const byId = asyncHandler(async (req, res, next) => {
  let data = await Student.findById(req.params.id);
  if (!data) return next(new ApiError("Invalid student id."));
  return res.json(new ApiSuccess(data, "Fetch student successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  let data = await Student.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  }).populate("gradeLevel schoolSystem", "name img");
  if (!data) return next(new ApiError("Error update student."));
  return res.json(new ApiSuccess(data, "student updated successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  let data = await Student.create(req.body);
  if (!data) return next(new ApiError("Error create student."));
  return res.json(new ApiSuccess(data, "student created successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  let data = await Student.findByIdAndDelete(req.query.id);
  if (!data) return next(new ApiError("Invalid student id."));
  return res.json(new ApiSuccess(undefined, "Student deleted successfully."));
});
module.exports = {
  update,
  create,
  getAll,
  byId,
  remove,
};
