const SchoolSystems = require("../modules/SchoolSystemsSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const data = await SchoolSystems.find({});
  return res.json(new ApiSuccess(data, "Fetch school systems successfully."));
});
const byId = asyncHandler(async (req, res, next) => {
  const data = await SchoolSystems.findById(req.params.id);
  if (!data) return next(new ApiError("Invalid school systems id."));
  return res.json(new ApiSuccess(data, "Fetch school system successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  const data = await SchoolSystems.create(req.body);
  if (!data) return next(new ApiError("Error create school system."));
  return res.json(new ApiSuccess(data, "school system created successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const data = await SchoolSystems.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!data) return next(new ApiError("Error update school system."));
  return res.json(new ApiSuccess(data, "school system updated successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  const data = await SchoolSystems.findByIdAndDelete(req.query.id);
  if (!data) return next(new ApiError("Invalid school system id."));
  return res.json(new ApiSuccess(data, "school system deleted successfully."));
});
module.exports = {
  update,
  create,
  getAll,
  byId,
  remove,
};
