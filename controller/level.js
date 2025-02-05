const asyncHandler = require("express-async-handler");
const Level = require("../modules/Level");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const levels = await Level.find().select("-__v");
  return res.json(new ApiSuccess("Fetch levels successfully.", levels));
});
const create = asyncHandler(async (req, res) => {
  const level = await Level.create(req.body);
  level.__v = undefined;
  return res.json(new ApiSuccess("Created level successfully", level));
});
const update = asyncHandler(async (req, res) => {
  const level = await Level.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  level.__v = undefined;
  return res.json(new ApiSuccess("Updated level successfully", level));
});
const remove = asyncHandler(async (req, res) => {
  const level = await Level.findByIdAndDelete(req.query._id);
  return res.json(new ApiSuccess("Deleted level successfully"));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
