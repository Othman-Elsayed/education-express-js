const LevelsGrades = require("../modules/LevelsGradesSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const data = await LevelsGrades.find({});
  return res.json(new ApiSuccess(data, "Fetch levels grade successfully."));
});
const byId = asyncHandler(async (req, res, next) => {
  const data = await LevelsGrades.findById(req.params.id);
  if (!data) return next(new ApiError("Invalid levels grade id."));
  return res.json(new ApiSuccess(data, "Fetch levels grade successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  const data = await LevelsGrades.create(req.body);
  if (!data) return next(new ApiError("Error create levels grade."));
  return res.json(new ApiSuccess(data, "levels grade created successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const data = await LevelsGrades.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!data) return next(new ApiError("Error update levels grade."));
  return res.json(new ApiSuccess(data, "Levels grade updated successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  const data = await LevelsGrades.findByIdAndDelete(req.query.id);
  if (!data) return next(new ApiError("Invalid levels grade id."));
  return res.json(new ApiSuccess(data, "Levels grade deleted successfully."));
});
module.exports = {
  update,
  create,
  getAll,
  byId,
  remove,
};
