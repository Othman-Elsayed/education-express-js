const asyncHandler = require("express-async-handler");
const Subject = require("../modules/Subject");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const subjects = await Subject.find().populate("img");
  return res.json(new ApiSuccess("Fetch subjects successfully.", subjects));
});
const create = asyncHandler(async (req, res) => {
  const { name, bio, img } = req.body;
  const subject = await Subject.create({ name, bio, img });
  return res.json(new ApiSuccess("Created subject successfully", subject));
});
const update = asyncHandler(async (req, res) => {
  const { _id, name, bio, img } = req.body;
  const subject = await Subject.findByIdAndUpdate(
    _id,
    { name, bio, img },
    {
      new: true,
    }
  );
  return res.json(new ApiSuccess("Updated subject successfully", subject));
});
const remove = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.query._id);
  return res.json(new ApiSuccess("Deleted subject successfully", subject));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
