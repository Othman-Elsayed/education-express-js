const asyncHandler = require("express-async-handler");
const Lesson = require("../modules/Lesson");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const { timeLeftUntil } = require("../utils/timeLeftUntil");

const getAll = asyncHandler(async (req, res) => {
  let lessons = await Lesson.find({
    $or: [
      { teacher: req.query.userId },
      { studentsRequests: req.query.userId },
    ],
  }).populate("teacher subject", "name");

  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});

const getById = asyncHandler(async (req, res) => {
  let lessons = await Lesson.findById(req.query.id).populate(
    "teacher subject studentsRequests studentsBooked",
    "name email img"
  );

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
  return res.json(new ApiSuccess("Created lesson successfully", lesson));
});

const finishedLesson = asyncHandler(async (req, res, next) => {
  const { lesson, day, startDate, endDate } = req.body;

  const findLesson = await Lesson.findById(lesson);
  if (findLesson.endDate !== endDate)
    return next(new ApiError("invalid end date."));
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const curr = `${formattedHours}:${formattedMinutes}`;
  const endTime = endDate;
  const hourCurrentTime = +curr.slice(0, 2);
  const minutesCurrentTime = +curr.slice(3, 5);
  const hourEndTime = +endTime.slice(0, 2);
  const minutesEndTime = +endTime.slice(3, 5);
  const currentDayIndex = now.getDay();
  const targetDayIndex = daysOfWeek.findIndex(
    (d) => d.toLowerCase() === day.toLowerCase()
  );

  if (targetDayIndex === -1) {
    return next(new ApiError("Invalid day provided."));
  }

  let finished;
  if (currentDayIndex === targetDayIndex) {
    if (
      hourCurrentTime > hourEndTime ||
      (hourCurrentTime === hourEndTime && minutesCurrentTime >= minutesEndTime)
    ) {
      finished = "finished";
    } else {
      finished = timeLeftUntil(endTime, day);
    }
  } else {
    finished = timeLeftUntil(endTime, day);
  }

  return res.json(new ApiSuccess("lesson", finished));
});

const update = asyncHandler(async (req, res, next) => {
  const { _id, subject, day, startDate, endDate, isGroup } = req.body;
  const findLesson = await Lesson.findById(_id);
  const isBooked = Boolean(
    findLesson.status?.toString()?.toLowerCase()?.trim() === "booked"
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

  const currentDate = new Date();
  if (new Date(endDate) < currentDate) {
    payload.status = "notbooked";
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
    getLesson.status?.toString()?.toLowerCase()?.trim() === "booked"
  );
  if (isBooked) {
    return next(new ApiError("You cannot delete booked sessions."));
  }
  await Lesson.findByIdAndDelete(id);
  return res.json(new ApiSuccess("Deleted lesson successfully"));
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  finishedLesson,
};
