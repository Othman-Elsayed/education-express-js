const asyncHandler = require("express-async-handler");
const Price = require("../modules/Price");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  let prices = await Price.find().populate("educationSystem", "name -_id");
  return res.json(new ApiSuccess("Fetch prices successfully.", prices));
});
const create = asyncHandler(async (req, res) => {
  const price = await Price.create(req.body);
  return res.json(new ApiSuccess("Created price successfully", price));
});
const update = asyncHandler(async (req, res) => {
  const price = await Price.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  return res.json(new ApiSuccess("Updated price successfully", price));
});
const remove = asyncHandler(async (req, res) => {
  const price = await Price.findByIdAndDelete(req.query.id);
  return res.json(new ApiSuccess("Deleted price successfully", price));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
