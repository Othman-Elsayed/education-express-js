const asyncHandler = require("express-async-handler");
const Price = require("../modules/Price");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  let prices = await Price.find()
    .populate("levels system", "name -_id")
    .select("-__v")
    .lean();

  let result = prices?.map((item) => ({
    ...item,
    system: item?.system?.name,
    levels: item?.levels?.map((e) => e?.name),
  }));
  return res.json(new ApiSuccess("Fetch prices successfully.", result));
});
const create = asyncHandler(async (req, res) => {
  const price = await Price.create(req.body);
  price.__v = undefined;
  return res.json(new ApiSuccess("Created price successfully", price));
});
const update = asyncHandler(async (req, res) => {
  const price = await Price.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  price.__v = undefined;
  return res.json(new ApiSuccess("Updated price successfully", price));
});
const remove = asyncHandler(async (req, res) => {
  const price = await Price.findByIdAndDelete(req.query._id);
  price.__v = undefined;
  return res.json(new ApiSuccess("Deleted price successfully", price));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
