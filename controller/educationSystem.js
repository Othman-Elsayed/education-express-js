const asyncHandler = require("express-async-handler");
const EducationSystem = require("../modules/EducationSystem");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const educationSystem = await EducationSystem.find().select("-__v");
  return res.json(
    new ApiSuccess("Fetch education system successfully.", educationSystem)
  );
});
const create = asyncHandler(async (req, res) => {
  const educationSystem = await EducationSystem.create(req.body);
  educationSystem.__v = undefined;
  return res.json(
    new ApiSuccess("Created education system successfully", educationSystem)
  );
});
const update = asyncHandler(async (req, res) => {
  const educationSystem = await EducationSystem.findByIdAndUpdate(
    req.body._id,
    req.body,
    {
      new: true,
    }
  );
  educationSystem.__v = undefined;
  return res.json(
    new ApiSuccess("Updated education system successfully", educationSystem)
  );
});
const remove = asyncHandler(async (req, res) => {
  await EducationSystem.findByIdAndDelete(req.query._id);
  return res.json(new ApiSuccess("Deleted education system successfully"));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
