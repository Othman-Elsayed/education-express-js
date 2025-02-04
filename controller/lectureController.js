const Lecture = require("../modules/LectureSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const tutorId = req.query.tutorId;
  const query = tutorId ? { tutor: tutorId } : {};
  const data = await Lecture.findOne(query);
  return res.json(
    new ApiSuccess(
      data,
      `Fetch schedules ${tutorId ? "by tutor" : ""} successfully.`
    )
  );
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
  return res.json(new ApiSuccess(data, "Fetch lectures successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  const data = await Lecture.create(req.body);
  if (!data) return next(new ApiError("Error create lecture."));
  return res.json(new ApiSuccess(data, "Lecture successfully."));
});
const update = asyncHandler(async (req, res, next) => {
  const data = await Lecture.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  if (!data) return next(new ApiError("Error update lecture."));
  return res.json(new ApiSuccess(data, "Lecture updated successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  const data = await Lecture.findByIdAndDelete(req.query.id);
  if (!data) return next(new ApiError("Invalid lecture id."));
  return res.json(new ApiSuccess(data, "Lecture deleted successfully."));
});
module.exports = {
  getAll,
  getByTutor,
  create,
  update,
  remove,
};
