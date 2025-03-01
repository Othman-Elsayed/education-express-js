const asyncHandler = require("express-async-handler");
const Price = require("../modules/Price");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const uploadController = require("./upload");

const getAll = asyncHandler(async (req, res) => {
  let prices = await Price.find()
    .populate({
      path: "educationSystem",
      populate: {
        path: "levels",
        select: "name",
        populate: {
          path: "img",
          select: "fileName",
        },
      },
    })
    .populate({
      path: "educationSystem",
      populate: {
        path: "img",
        select: "fileName",
      },
    });
  return res.json(new ApiSuccess("Fetch prices successfully.", prices));
});
const getById = asyncHandler(async (req, res) => {
  let prices = await Price.findById(req.query._id).populate({
    path: "educationSystem",
    populate: "levels",
  });
  return res.json(new ApiSuccess("Fetch prices successfully.", prices));
});
const create = asyncHandler(async (req, res) => {
  const price = await Price.create(req.body);
  return res.json(new ApiSuccess("Created price successfully", price));
});
const update = asyncHandler(async (req, res) => {
  const price = await Price.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  return res.json(new ApiSuccess("Updated price successfully", price));
});
const remove = asyncHandler(async (req, res, next) => {
  const price = await Price.findById(req.query._id).populate("img");
  if (!price) {
    return next(new ApiError("Price not found", 404));
  }
  if (Boolean(price.img)) {
    req.body.owner = price.img.owner;
    req.body.fileName = price.img.fileName;
    await uploadController.remove(req, res, next);
  }
  await Price.findByIdAndDelete(req.query._id);
  return res.json(
    new ApiSuccess("Deleted price and related file successfully", price)
  );
});

module.exports = {
  getAll,
  create,
  update,
  remove,
  getById,
};
