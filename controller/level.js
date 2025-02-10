const asyncHandler = require("express-async-handler");
const Level = require("../modules/Level");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const levels = await Level.find();
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
const remove = asyncHandler(async (req, res) => {
  const level = await Level.findByIdAndDelete(req.query._id);
  return res.json(new ApiSuccess("Deleted level successfully", level));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
