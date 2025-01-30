const Schedule = require("../modules/ScheduleSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const tutorId = req.query.tutorId;
  const data = await Schedule.find(tutorId ? { tutor: tutorId } : "");
  return res.json(
    new ApiSuccess(
      data,
      `Fetch schedules ${tutorId ? "by tutor" : ""} successfully.`
    )
  );
});

const getById = asyncHandler(async (req, res, next) => {
  const data = await Schedule.findById(req.params.id);
  if (!data) return next(new ApiError("Invalid schedule id."));
  return res.json(new ApiSuccess(data, "Fetch schedule successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  const data = await Schedule.create(req.body);
  if (!data) return next(new ApiError("Error create schedule."));
  return res.json(new ApiSuccess(data, "Schedule successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const data = await Schedule.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!data) return next(new ApiError("Error update schedule."));
  return res.json(new ApiSuccess(data, "Schedule updated successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  const data = await Schedule.findByIdAndDelete(req.query.id);
  if (!data) return next(new ApiError("Invalid schedule id."));
  return res.json(new ApiSuccess(data, "Schedule deleted successfully."));
});
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
