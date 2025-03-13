const asyncHandler = require("express-async-handler");
const EducationSystem = require("../modules/EducationSystem");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const cloudinary = require("cloudinary").v2;

const getAll = asyncHandler(async (req, res) => {
  const educationSystem = await EducationSystem.find()
    .populate("img")
    .populate({
      path: "levels",
      select: "img name",
      populate: { path: "img" },
    });

  return res.json(
    new ApiSuccess("Fetch education system successfully.", educationSystem)
  );
});
const create = asyncHandler(async (req, res) => {
  const { name, bio, img, levels } = req.body;
  const educationSystem = await EducationSystem.create({
    name,
    bio,
    img,
    levels,
  });
  return res.json(
    new ApiSuccess("Created education system successfully", educationSystem)
  );
});
const update = asyncHandler(async (req, res) => {
  const { _id, name, bio, img, levels } = req.body;
  const educationSystem = await EducationSystem.findByIdAndUpdate(
    _id,
    { name, bio, img, levels },
    {
      new: true,
    }
  );
  return res.json(
    new ApiSuccess("Updated education system successfully", educationSystem)
  );
});
const remove = asyncHandler(async (req, res, next) => {
  const system = await EducationSystem.findById(req.query._id);
  if (!system) {
    return next(new ApiError("System not found"));
  }
  await cloudinary.uploader.destroy(system.img?.public_id);
  await EducationSystem.findByIdAndDelete(req.query._id);
  return res.json(
    new ApiSuccess("Deleted education system successfully", system)
  );
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
