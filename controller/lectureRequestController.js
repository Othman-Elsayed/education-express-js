const Lecture = require("../modules/LectureRequestSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const data = await Lecture.find({})
    .populate("levelGrade schoolSystems subject", "name")
    .select("-__v")
    .lean();
  return res.json(new ApiSuccess(data, "Fetch lectures requests successfully"));
});

const getByTutor = asyncHandler(async (req, res, next) => {
  let data = await Lecture.find({ tutor: req.query.tutor })
    .populate("levelGrade schoolSystems subject", "name")
    .select("-__v")
    .lean();
  data = data.map((lecture) => {
    return {
      ...lecture,
      levelGrade: lecture.levelGrade?.name,
      schoolSystems: lecture.schoolSystems?.name,
      subject: lecture.subject?.name,
    };
  });
  if (!data) return next(new ApiError("Invalid tutor id."));
  return res.json(
    new ApiSuccess(data, "Fetch lectures requests successfully.")
  );
});
const getByStudent = asyncHandler(async (req, res, next) => {
  let data = await Lecture.find({ tutor: req.query.student })
    .populate("levelGrade schoolSystems subject", "name")
    .select("-__v")
    .lean();
  data = data.map((lecture) => {
    return {
      ...lecture,
      levelGrade: lecture.levelGrade?.name,
      schoolSystems: lecture.schoolSystems?.name,
      subject: lecture.subject?.name,
    };
  });
  if (!data) return next(new ApiError("Invalid tutor id."));
  return res.json(
    new ApiSuccess(data, "Fetch lectures requests successfully.")
  );
});
const create = asyncHandler(async (req, res, next) => {
  const data = await Lecture.create(req.body);
  if (!data) return next(new ApiError("Error request lecture."));
  return res.json(new ApiSuccess(data, "Lecture request successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const data = await Lecture.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!data) return next(new ApiError("Error request lecture."));
  return res.json(
    new ApiSuccess(data, "Lecture request updated successfully.")
  );
});
const remove = asyncHandler(async (req, res, next) => {
  const data = await Lecture.findByIdAndDelete(req.query.id);
  if (!data) return next(new ApiError("Invalid lecture request id."));
  return res.json(
    new ApiSuccess(data, "Lecture request deleted successfully.")
  );
});
module.exports = {
  getAll,
  getByStudent,
  getByTutor,
  create,
  update,
  remove,
};
