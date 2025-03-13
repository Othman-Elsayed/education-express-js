const asyncHandler = require("express-async-handler");
const Lesson = require("../modules/Lesson");
const Price = require("../modules/Price");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const Booking = require("../modules/Booking");
const Notification = require("../modules/Notification");

const getByStudent = asyncHandler(async (req, res) => {
  const { status = "booked" } = req.query;
  const student = req.user._id;
  const lessons = await Lesson.find({
    $and: [
      { status },
      {
        $or: [{ studentsBooked: student }, { studentsRequests: student }],
      },
    ],
  }).populate({
    path: "teacher subject price studentsBooked studentsRequests",
    select: "name img sessions",
    populate: {
      path: "img",
      select: "fileName",
    },
  });
  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});
const getByTeacher = asyncHandler(async (req, res) => {
  const teacher = req.user._id;
  const lessons = await Lesson.find({
    teacher,
    status: { $ne: "removed" },
  }).populate({
    path: "teacher subject price studentsBooked studentsRequests",
    select: "name img sessions",
    populate: {
      path: "img",
      select: "fileName",
    },
  });
  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});
const getShowInProfile = asyncHandler(async (req, res) => {
  const { teacher } = req.query;
  const lessons = await Lesson.find({
    $and: [
      { teacher },
      { status: { $ne: "removed" } },
      {
        $or: [{ status: "notbooked" }, { status: "booked", isGroup: true }],
      },
    ],
  }).populate({
    path: "teacher subject price studentsBooked studentsRequests",
    select: "name img sessions",
    populate: {
      path: "img",
      select: "fileName",
    },
  });
  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});
const getById = asyncHandler(async (req, res) => {
  let lessons = await Lesson.findById(req.query._id).populate({
    path: "teacher subject price studentsBooked studentsRequests",
    select: "name img",
    populate: {
      path: "img",
      select: "fileName",
    },
  });
  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});
const create = asyncHandler(async (req, res) => {
  const {
    teacher,
    price,
    subject,
    groupLength,
    day,
    startDate,
    endDate,
    isGroup,
  } = req.body;
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
    +req.user.evaluation >= 3
  ) {
    payload.isGroup = isGroup;
    payload.groupLength = groupLength;
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
// const finishedLesson = asyncHandler(async (req, res, next) => {
//   const { lesson } = req.body;
//   const findLesson = await Lesson.findById(lesson).populate("price");
//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const formattedHours = String(hours).padStart(2, "0");
//   const formattedMinutes = String(minutes).padStart(2, "0");
//   const curr = `${formattedHours}:${formattedMinutes}`;

//   const hourStartTime = +findLesson.startDate.slice(0, 2);
//   const minutesStartTime = +findLesson.startDate.slice(3, 5);
//   const hourEndTime = +findLesson.endDate.slice(0, 2);
//   const minutesEndTime = +findLesson.endDate.slice(3, 5);

//   const hourCurrentTime = +curr.slice(0, 2);
//   const minutesCurrentTime = +curr.slice(3, 5);

//   const currentDayIndex = now.getDay();
//   const targetDayIndex = daysOfWeek.findIndex(
//     (d) => d.toLowerCase() === findLesson.day.toLowerCase()
//   );

//   if (targetDayIndex === -1) {
//     return next(new ApiError("The specified day is invalid."));
//   }

//   if (currentDayIndex === targetDayIndex) {
//     if (
//       hourCurrentTime < hourStartTime ||
//       (hourCurrentTime === hourStartTime &&
//         minutesCurrentTime < minutesStartTime)
//     ) {
//       return next(
//         new ApiError("Status Lesson: The lesson has not started yet..")
//       );
//     } else if (
//       hourCurrentTime > hourEndTime ||
//       (hourCurrentTime === hourEndTime && minutesCurrentTime >= minutesEndTime)
//     ) {
//       let lessonUpdate;
//       if (+findLesson.sessions > 1) {
//         lessonUpdate = await Lesson.findByIdAndUpdate(
//           lesson,
//           {
//             $inc: { sessions: -1 },
//             $set: { bookingDate: new Date(Date.now() + 2 * 60 * 1000) },
//           },
//           { new: true }
//         );
//       } else {
//         lessonUpdate = await Lesson.findByIdAndUpdate(
//           lesson,
//           {
//             sessions: +findLesson.price.sessions,
//             studentsBooked: [],
//             status: "notbooked",
//             bookingDate: "",
//           },
//           { new: true }
//         );
//       }
//       return res.json(new ApiSuccess("Status Lesson", lessonUpdate));
//     } else {
//       return next(new ApiError("Status Lesson: Lesson is running."));
//     }
//   } else {
//     return next(new ApiError("Status Lesson: The lesson has not started yet."));
//   }
// });

function handleCheck({ day, startTime, endTime }) {
  const now = new Date();
  const currentDay = now
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  if (currentDay !== day.toLowerCase()) {
    return "invalid-day";
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const startDate = new Date(now);
  startDate.setHours(startHour, startMinute, 0, 0);
  const endDate = new Date(now);
  endDate.setHours(endHour, endMinute, 0, 0);

  if (now < startDate) {
    return "pending";
  } else if (now >= startDate && now < endDate) {
    return "progress";
  } else {
    return "finished";
  }
}

const finishedLesson = asyncHandler(async (req, res, next) => {
  const { lesson } = req.body;

  const findLesson = await Lesson.findById(lesson).populate("price subject");
  if (!findLesson) return next(new ApiError("Lesson dose not exist."));

  const {
    day,
    startDate: startTime,
    endDate: endTime,
    bookingDate,
  } = findLesson;
  const bookingDateTime = new Date(bookingDate);

  const [endHour, endMinute] = endTime.split(":").map(Number);
  const endDate = new Date(bookingDateTime);
  endDate.setHours(endHour, endMinute, 0, 0);

  if (bookingDateTime > endDate) {
    return next(new ApiError("Lesson is pending."));
  }

  const status = handleCheck({ day, startTime, endTime });
  if (status === "finished") {
    let lessonUpdate;
    if (+findLesson.sessions > 1) {
      lessonUpdate = await Lesson.findByIdAndUpdate(
        lesson,
        {
          $inc: { sessions: -1 },
          $set: { bookingDate: new Date(Date.now() + 2 * 60 * 1000) },
        },
        { new: true }
      );
      await Notification.create({
        to: [findLesson.teacher, ...findLesson.studentsBooked],
        msg: `The lesson is over and there are ${lessonUpdate?.sessions} sessions left.`,
      });
    } else {
      await Notification.create({
        to: [findLesson.teacher, ...findLesson.studentsBooked],
        msg: `The lesson ${findLesson.subject.name} is over.`,
      });
      lessonUpdate = await Lesson.findByIdAndUpdate(
        lesson,
        {
          sessions: +findLesson.price.sessions,
          studentsBooked: [],
          status: "notbooked",
          bookingDate: "",
        },
        { new: true }
      );
    }
    return res.json(new ApiSuccess("Lesson Finished Success.", lessonUpdate));
  } else {
    return next(new ApiError("Lesson is progress or pending."));
  }
});

const remove = asyncHandler(async (req, res, next) => {
  const id = req.query._id;
  const getLesson = await Lesson.findById(id);
  const bookings = await Booking.find({ lesson: id });

  const isBooked = Boolean(
    getLesson.status?.toString()?.toLowerCase()?.trim() === "booked"
  );
  if (isBooked) {
    return next(new ApiError("You cannot delete booked sessions."));
  }

  if (
    req.user.role !== "teacher" ||
    req.user._id?.toString() !== getLesson.teacher?.toString()
  ) {
    return next(new ApiError("You cannot delete other teacher's lessons."));
  }

  if (bookings?.length) {
    await Lesson.findByIdAndUpdate(id, { status: "removed" }, { new: true });
  } else {
    await Lesson.findByIdAndDelete(id);
  }

  await Booking.updateMany(
    { lesson: id, status: "pending" },
    { status: "removedlesson" }
  );

  return res.json(new ApiSuccess("Deleted lesson successfully"));
});

module.exports = {
  getById,
  create,
  update,
  remove,
  finishedLesson,
  getShowInProfile,
  getByStudent,
  getByTeacher,
};
