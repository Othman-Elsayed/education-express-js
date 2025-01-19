const Schema = require("../modules/TutorSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const hideData = (data) => {
  return {
    ...data?.userId?._doc,
    ...data?._doc,
    userId: data?.userId?._doc?._id,
    password: undefined,
    __v: undefined,
  };
};
const getAll = asyncHandler(async (req, res) => {
  let data = await Schema.find({}).populate("userId", "-password").populate({
    path: "subjects",
    select: "name avatar -_id",
  });
  data = data?.map((u) => hideData(u));
  return res.json(new ApiSuccess(data, "Fetch tutors successfully."));
});
const byId = asyncHandler(async (req, res, next) => {
  let data = await Schema.findById(req.params.id)
    .populate("userId", "-password")
    .populate({
      path: "subjects",
      select: "name avatar -_id",
    });
  if (!data) return next(new ApiError("Invalid tutor id."));
  data = hideData(data);
  return res.json(new ApiSuccess(data, "Fetch tutor successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const { userId, ...other } = req.body;
  let data = await Schema.findByIdAndUpdate(req.body._id, other, {
    new: true,
  })
    .populate("userId", "-password")
    .populate({
      path: "subjects",
      select: "name avatar -_id",
    });
  if (!data) return next(new ApiError("Error update tutor."));
  data = hideData(data);
  return res.json(new ApiSuccess(data, "Tutor updated successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  let data = await Schema.create(req.body);
  if (!data) return next(new ApiError("Error create tutor."));
  return res.json(new ApiSuccess(undefined, "Tutor created successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  let data = await Schema.findByIdAndDelete(req.params.id);
  if (!data) return next(new ApiError("Invalid student id."));
  return res.json(new ApiSuccess(undefined, "Tutor deleted successfully."));
});
module.exports = {
  update,
  create,
  getAll,
  byId,
  remove,
};
