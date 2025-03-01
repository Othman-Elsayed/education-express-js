const asyncHandler = require("express-async-handler");
const Review = require("../modules/Review");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getByTeacher = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ teacher: req.query._id })
    .populate("writer", "name img")
    .sort({
      createdAt: -1,
    });
  return res.json(new ApiSuccess("Fetch reviews successfully.", reviews));
});
const getAll = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "writer teacher",
      select: "name img",
      populate: {
        path: "img",
        select: "fileName",
      },
    })
    .sort({
      createdAt: -1,
    });
  return res.json(new ApiSuccess("Fetch reviews successfully.", reviews));
});

const create = asyncHandler(async (req, res) => {
  const { teacher, writer, likes, comment, rating } = req.body;
  const review = await Review.create({
    teacher,
    writer,
    likes,
    comment,
    rating,
  });
  return res.json(new ApiSuccess("Created review successfully", review));
});

const update = asyncHandler(async (req, res, next) => {
  const { _id, likes, comment, rating } = req.body;
  const findReview = await Review.findById(_id);
  if (Boolean(findReview?.writer?.toString() === req.user?._id?.toString())) {
    const review = await Review.findByIdAndUpdate(
      _id,
      { comment, rating },
      {
        new: true,
      }
    );
    return res.json(new ApiSuccess("Updated review successfully", review));
  }
  return next(new ApiError("Cant edit this review"));
});

const remove = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.query._id);
  if (Boolean(review?.writer?.toString() === req.user?._id?.toString())) {
    await Review.findByIdAndDelete(req.query._id);
    return res.json(new ApiSuccess("Deleted review successfully", review));
  }
  return next(new ApiError("Cant remove this review"));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
  getByTeacher,
};
