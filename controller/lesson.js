const asyncHandler = require("express-async-handler");
const Lesson = require("../modules/Lesson");
const Price = require("../modules/Price");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const Booking = require("../modules/Booking");
const getAll = asyncHandler(async (req, res) => {
  const { size, page, ...others } = req.query;
  const lessons = await Lesson.find({ ...others }).populate(
    "teacher subject studentsBooked",
    "name"
  );
  return res
    .status(200)
    .json(new ApiSuccess("Fetch lessons successfully.", lessons));
});

const getById = asyncHandler(async (req, res) => {
  let lessons = await Lesson.findById(req.query._id).populate(
    "teacher subject price studentsBooked",
    "name email img"
  );

  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});

const create = asyncHandler(async (req, res) => {
  const { teacher, price, subject, day, startDate, endDate, isGroup } =
    req.body;
  const findPrice = await Price.findById(price);
  let payload = {
    teacher,
    price,
    subject,
    day,
    startDate,
    endDate,
    sessions: findPrice?.sessions,
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

const finishedLesson = asyncHandler(async (req, res, next) => {
  const { lesson } = req.body;
  const findLesson = await Lesson.findById(lesson).populate("price");

  if (findLesson.sessions <= 0) {
    await Lesson.findByIdAndUpdate(
      lesson,
      {
        sessions: +findLesson.sessions === 0 ? 0 : +findLesson.sessions - 1,
        studentsBooked: [],
        status: "notbooked",
      },
      { new: true }
    );
    return next(new ApiError("Please renew your reservation first."));
  }

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

  const hourStartTime = +findLesson.startDate.slice(0, 2);
  const minutesStartTime = +findLesson.startDate.slice(3, 5);
  const hourEndTime = +findLesson.endDate.slice(0, 2);
  const minutesEndTime = +findLesson.endDate.slice(3, 5);

  const hourCurrentTime = +curr.slice(0, 2);
  const minutesCurrentTime = +curr.slice(3, 5);

  const currentDayIndex = now.getDay();
  const targetDayIndex = daysOfWeek.findIndex(
    (d) => d.toLowerCase() === findLesson.day.toLowerCase()
  );

  if (targetDayIndex === -1) {
    return next(new ApiError("The specified day is invalid."));
  }

  if (currentDayIndex === targetDayIndex) {
    if (
      hourCurrentTime < hourStartTime ||
      (hourCurrentTime === hourStartTime &&
        minutesCurrentTime < minutesStartTime)
    ) {
      return next(
        new ApiError("Status Lesson: The lesson has not started yet..")
      );
    } else if (
      hourCurrentTime > hourEndTime ||
      (hourCurrentTime === hourEndTime && minutesCurrentTime >= minutesEndTime)
    ) {
      const lessonUpdate = await Lesson.findByIdAndUpdate(
        lesson,
        {
          sessions: +findLesson.sessions === 0 ? 0 : +findLesson.sessions - 1,
        },
        { new: true }
      );
      return res.json(new ApiSuccess("Status Lesson", lessonUpdate));
    } else {
      return next(new ApiError("Status Lesson: Lesson is running."));
    }
  } else {
    return next(new ApiError("Status Lesson: The lesson has not started yet."));
  }
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
  console.log(req.user._id, getLesson.teacher, req.user.role);

  if (
    req.user.role !== "teacher" ||
    req.user._id?.toString() !== getLesson.teacher?.toString()
  ) {
    return next(new ApiError("You cannot delete other teacher's lessons."));
  }
  await Booking.findOneAndDelete({ lesson: id });
  await Lesson.findByIdAndDelete(id);
  return res.json(new ApiSuccess("Deleted lesson successfully"));
});

module.exports = {
  getById,
  create,
  update,
  remove,
  finishedLesson,
  getAll,
};
