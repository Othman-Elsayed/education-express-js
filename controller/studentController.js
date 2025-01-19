const Student = require("../modules/StudentSchema");
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
  let data = await Student.find({}).populate("userId", "-password");
  data = data?.map((u) => hideData(u));
  return res.json(new ApiSuccess(data, "Fetch students successfully."));
});
const byId = asyncHandler(async (req, res, next) => {
  let data = await Student.findById(req.params.id).populate(
    "userId",
    "-password"
  );
  if (!data) return next(new ApiError("Invalid student id."));
  data = hideData(data);
  return res.json(new ApiSuccess(data, "Fetch student successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const { userId, ...other } = req.body;
  let data = await Student.findByIdAndUpdate(req.body._id, other, {
    new: true,
  }).populate("userId", "-password");
  if (!data) return next(new ApiError("Error update student."));
  data = hideData(data);
  return res.json(new ApiSuccess(data, "student updated successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  let data = await Student.create(req.body);
  if (!data) return next(new ApiError("Error create student."));
  return res.json(new ApiSuccess(undefined, "student created successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  let data = await Student.findByIdAndDelete(req.params.id);
  if (!data) return next(new ApiError("Invalid student id."));
  return res.json(new ApiSuccess(undefined, "Student deleted successfully."));
});
module.exports = {
  update,
  create,
  getAll,
  byId,
  remove,
};
