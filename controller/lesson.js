const asyncHandler = require("express-async-handler");
const Lesson = require("../modules/Lesson");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  let lessons;
  const isAdmin = Boolean(req.user.role?.includes("admin"));

  if (isAdmin) {
    lessons = Lesson.find({});
  } else {
    lessons = Lesson.find({
      $or: [
        { teacher: req.query.userId },
        { studentsRequests: req.query.userId },
      ],
    });
  }

  await lessons.populate("teacher subject", "name").select("-__v");
  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});

const create = asyncHandler(async (req, res) => {
  const { teacher, price, subject, day, startDate, endDate, isGroup } =
    req.body;
  let payload = {
    teacher,
    price,
    subject,
    day,
    startDate,
    endDate,
  };
  if (
    ["teacher", "admin"].includes(req.user.role) &&
    +req.user.evaluation >= 5
  ) {
    payload.isGroup = isGroup;
  }
  const lesson = await Lesson.create(payload);
  lesson.__v = undefined;
  return res.json(new ApiSuccess("Created lesson successfully", lesson));
});

const update = asyncHandler(async (req, res, next) => {
  const { _id, subject, day, startDate, endDate, isGroup } = req.body;
  const findLesson = await Lesson.findById(_id);
  const isBooked = Boolean(
    findLesson.status?.toString()?.toLowerCase()?.trim()?.includes("booked")
  );
  if (isBooked)
    return next(
      new ApiError("The session cannot be updated after it has been booked.")
    );
  let payload = {
    subject,
    day,
    startDate,
    endDate,
  };
  if (
    ["teacher", "admin"].includes(req.user.role) &&
    +req.user.evaluation >= 5
  ) {
    payload.isGroup = isGroup;
  }
  const lesson = await Lesson.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return res.json(new ApiSuccess("Updated lesson successfully", lesson));
});

const remove = asyncHandler(async (req, res, next) => {
  const id = req.query._id;
  const getLesson = await Lesson.findById(id);
  const isBooked = Boolean(
    getLesson.status?.toString()?.toLowerCase()?.trim()?.includes("booked")
  );
  if (isBooked) {
    return next(new ApiError("You cannot delete booked sessions."));
  }
  await Lesson.findByIdAndDelete(id);
  return res.json(new ApiSuccess("Deleted lesson successfully"));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
