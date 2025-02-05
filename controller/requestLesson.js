const asyncHandler = require("express-async-handler");
const RequestLesson = require("../modules/RequestLesson");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const levels = await RequestLesson.find().select("-__v");
  return res.json(new ApiSuccess("Fetch request lesson successfully.", levels));
});
const create = asyncHandler(async (req, res) => {
  const level = await RequestLesson.create(req.body);
  level.__v = undefined;
  return res.json(new ApiSuccess("Created request lesson successfully", level));
});
const update = asyncHandler(async (req, res) => {
  const level = await RequestLesson.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  level.__v = undefined;
  return res.json(new ApiSuccess("Updated request lesson successfully", level));
});
const remove = asyncHandler(async (req, res) => {
  const level = await RequestLesson.findByIdAndDelete(req.query._id);
  level.__v = undefined;
  return res.json(new ApiSuccess("Deleted request lesson successfully", level));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
