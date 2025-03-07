const asyncHandler = require("express-async-handler");
const Booking = require("../modules/Booking");
const Lesson = require("../modules/Lesson");
const Chat = require("../modules/Chat");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const User = require("../modules/User");

const get = asyncHandler(async (req, res) => {
  const { page = 1, size = 10, ...queryOther } = req.query;
  const isAdmin = Boolean(req.user.role === "admin");
  const userId = req.user._id;

  const findBy = isAdmin
    ? {}
    : {
        $or: [{ teacher: userId }, { student: userId }],
      };

  const sortBy = isAdmin ? { createdAt: -1 } : { updatedAt: -1 };

  if (queryOther.status) {
    findBy.status = queryOther.status;
  }

  const totalDocuments = await Booking.countDocuments(findBy);
  const totalPages = Math.ceil(totalDocuments / size);

  const bookings = await Booking.find(findBy)
    .sort(sortBy)
    .skip((page - 1) * size)
    .limit(size)
    .populate([
      {
        path: "student teacher",
        populate: {
          path: "img",
          select: "fileName",
        },
      },
      {
        path: "lesson",
        populate: {
          path: "subject studentsRequests",
          select: "name img",
          populate: {
            path: "img",
            select: "fileName name email phoneNumber",
          },
        },
      },
      {
        path: "price",
        populate: {
          path: "educationSystem",
        },
      },
    ]);
  return res.json(new ApiSuccess("Fetch successfully.", bookings, totalPages));
});

const byId = asyncHandler(async (req, res) => {
  const bookings = await Booking.findById(req.query._id).populate([
    {
      path: "student teacher",
      populate: {
        path: "img",
        select: "fileName",
      },
    },
    {
      path: "lesson",
      populate: {
        path: "subject studentsRequests",
        select: "name img",
        populate: {
          path: "img",
          select: "fileName name email phoneNumber",
        },
      },
    },
    {
      path: "price",
      populate: {
        path: "educationSystem",
      },
    },
  ]);
  return res.json(new ApiSuccess("Fetch successfully.", bookings));
});

const send = asyncHandler(async (req, res, next) => {
  const { lesson } = req.body;
  const student = req.user._id;
  const findLesson = await Lesson.findById(lesson);
  const findStudent = await User.findById(student);

  if (!student && findStudent.role !== "student") {
    return next(new ApiError("Invalid student id."));
  }

  if (findLesson.studentsBooked.length >= findLesson.groupLength) {
    return next(new ApiError("Sorry, the group members are full."));
  }

  const booking = await Booking.create({
    teacher: findLesson.teacher,
    price: findLesson.price,
    student: findStudent?._id,
    lesson,
  });

  if (!booking) return next(new ApiError("Error connection try again."));

  // Update lesson
  await Lesson.findByIdAndUpdate(
    lesson,
    {
      $addToSet: { studentsRequests: student },
    },
    { new: true }
  );

  // Results
  return res.json(
    new ApiSuccess("Reservation has been sent successfully 🎉", booking)
  );
});

const cancel = asyncHandler(async (req, res, next) => {
  const { lesson } = req.body;
  const student = req.user._id;

  // Validate student and lesson
  const findLesson = await Lesson.findById(lesson);
  const findStudent = await User.findById(student);

  if (!findStudent || findStudent.role !== "student") {
    return next(new ApiError("Invalid student ID or role.", 400));
  }

  if (!findLesson) {
    return next(new ApiError("Lesson not found.", 404));
  }

  // Check if the student has a request in the lesson
  const isStudentInRequests = findLesson.studentsRequests.some(
    (s) => s?.toString() === student.toString()
  );

  if (!isStudentInRequests) {
    return next(
      new ApiError(
        "Student does not have a booking request for this lesson.",
        400
      )
    );
  }

  const booking = await Booking.findOne({
    lesson,
    student,
  }).populate("lesson student teacher price");

  // if (!booking) return next(new ApiError("Error connection try again."));
  await Booking.updateMany(
    {
      lesson,
      student,
    },
    { status: "canceled" }
  );

  // Update the lesson
  await Lesson.findByIdAndUpdate(
    lesson,
    {
      $pull: { studentsRequests: student },
    },
    { new: true }
  );

  // Return success response
  return res.json(
    new ApiSuccess("Reservation has been canceled successfully. 🎉", booking)
  );
});

const accepted = asyncHandler(async (req, res, next) => {
  const { teacher, student, lesson, booking } = req.body;

  const findLesson = await Lesson.findById(lesson);
  if (!findLesson) {
    return next(new ApiError("This Lesson not found."));
  }

  if (findLesson.status === "booked" && !findLesson.isGroup) {
    return next(new ApiError("This Lesson already booked."));
  }

  if (findLesson.studentsBooked.length >= findLesson.groupLength) {
    return next(new ApiError("Sorry, the group members are full."));
  }

  // Update Booking
  await Booking.findByIdAndUpdate(
    booking,
    { status: "accepted" },
    { new: true }
  );

  // Update Lesson
  await Lesson.findByIdAndUpdate(
    lesson,
    {
      $pull: { studentsRequests: student },
      $addToSet: { studentsBooked: student },
      $set: { status: "booked", bookingDate: new Date() },
    },
    { new: true }
  );

  // Create Chat
  const findChat = await Chat.findOne({
    members: { $all: [student, teacher] },
  });

  if (!findChat) {
    await Chat.create({
      members: [student, teacher],
    });
  }

  // Results
  return res.json(new ApiSuccess("Booking has been accepted successfully. 🎉"));
});

const reject = asyncHandler(async (req, res, next) => {
  const { student, teacher, lesson, booking } = req.body;

  const findLesson = await Lesson.findById(lesson);
  if (
    !findLesson.studentsRequests.includes(student) ||
    findLesson.teacher.toString() !== teacher
  ) {
    return next(
      new ApiError("You do not have permission to access this resource.")
    );
  }

  // update Booking
  const newBooking = await Booking.findByIdAndUpdate(
    booking,
    { status: "rejected" },
    { new: true }
  );
  if (!newBooking) return next(new ApiError("Error connection try again."));

  // Update Lesson
  const updateLesson = await Lesson.findByIdAndUpdate(
    lesson,
    {
      $pull: { studentsRequests: student, studentsBooked: student },
      $set: { status: "notbooked" },
    },
    { new: true }
  );

  // Results
  return res.json(
    new ApiSuccess("Booking has been rejected successfully. 🎉", {
      updateLesson,
      booking,
    })
  );
});

const remove = asyncHandler(async (req, res, next) => {
  const bookingId = req.query._id;

  if (!bookingId) {
    return next(new ApiError("Booking ID is required.", 400));
  }

  const findBooking = await Booking.findById(bookingId);

  if (!findBooking) {
    return next(new ApiError("Booking not found.", 404));
  }

  // Check if the booking status is "accepted"
  if (findBooking.status === "accepted") {
    return next(
      new ApiError("The booking cannot be deleted until the session ends.", 400)
    );
  }

  // Delete the booking
  const deleteBooking = await Booking.findByIdAndDelete(bookingId);

  if (!deleteBooking) {
    return next(
      new ApiError("Failed to delete the booking. Please try again.", 500)
    );
  }

  // Return success response
  return res.json(
    new ApiSuccess("Booking has been canceled successfully. 🎉", deleteBooking)
  );
});

module.exports = {
  get,
  send,
  accepted,
  reject,
  remove,
  cancel,
  byId,
};
