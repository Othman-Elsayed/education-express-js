const asyncHandler = require("express-async-handler");
const Level = require("../modules/Level");
const ApiSuccess = require("../utils/apiSuccess");
const uploadController = require("./upload");

const getAll = asyncHandler(async (req, res) => {
  const levels = await Level.find().populate("img");
  return res.json(new ApiSuccess("Fetch levels successfully.", levels));
});
const create = asyncHandler(async (req, res) => {
  const { name, bio, img } = req.body;
  const level = await Level.create({ name, bio, img });
  return res.json(new ApiSuccess("Created level successfully", level));
});
const update = asyncHandler(async (req, res) => {
  const { _id, name, bio, img } = req.body;
  const level = await Level.findByIdAndUpdate(
    _id,
    { name, bio, img },
    {
      new: true,
    }
  );
  return res.json(new ApiSuccess("Updated level successfully", level));
});
const remove = asyncHandler(async (req, res, next) => {
  const level = await Level.findById(req.query._id).populate("img");
  if (!level) {
    return next(new ApiError("Level not found", 404));
  }
  if (Boolean(level.img)) {
    req.body.owner = level.img.owner;
    req.body.fileName = level.img.fileName;

    await uploadController.remove(req, res, next);
  }
  await Level.findByIdAndDelete(req.query._id);
  return res.json(new ApiSuccess("Deleted level successfully", level));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
