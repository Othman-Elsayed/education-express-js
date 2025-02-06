const asyncHandler = require("express-async-handler");
const Subject = require("../modules/Subject");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const subjects = await Subject.find().select("-__v");
  return res.json(new ApiSuccess("Fetch subjects successfully.", subjects));
});
const create = asyncHandler(async (req, res) => {
  const subject = await Subject.create(req.body);
  subject.__v = undefined;
  return res.json(new ApiSuccess("Created subject successfully", subject));
});
const update = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  subject.__v = undefined;
  return res.json(new ApiSuccess("Updated subject successfully", subject));
});
const remove = asyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.query.id);
  return res.json(new ApiSuccess("Deleted subject successfully"));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
