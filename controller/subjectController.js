const Subject = require("../modules/SubjectSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const data = await Subject.find({});
  return res.json(new ApiSuccess(data, "Fetch subjects successfully."));
});
const getById = asyncHandler(async (req, res, next) => {
  const data = await Subject.findById(req.params.id);
  if (!data) return next(new ApiError("Invalid subject id."));
  return res.json(new ApiSuccess(data, "Fetch subject successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  const data = await Subject.create(req.body);
  if (!data) return next(new ApiError("Error create subject."));
  return res.json(new ApiSuccess(data, "Subject successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const data = await Subject.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!data) return next(new ApiError("Error update subject."));
  return res.json(new ApiSuccess(data, "Subject updated successfully."));
});
const remove = asyncHandler(async (req, res) => {
  const data = await Subject.findByIdAndDelete(req.params.id);
  if (!data) return next(new ApiError("Invalid subject id."));
  return res.json(new ApiSuccess(data, "Subject deleted successfully."));
});
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
