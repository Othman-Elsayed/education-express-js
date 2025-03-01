const asyncHandler = require("express-async-handler");
const Booking = require("../modules/Booking");
const Lesson = require("../modules/Lesson");
const Chat = require("../modules/Chat");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const User = require("../modules/User");

const get = asyncHandler(async (req, res) => {
  const query =
    req.user.role === "admin"
      ? {}
      : {
          $or: [{ teacher: req.user._id }, { student: req.user._id }],
        };

  const bookings = await Booking.find(query).populate(
    "lesson student teacher price"
  );
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

  // Create a new booking
  const booking = await Booking.create({
    teacher: findLesson.teacher,
    price: findLesson.price,
    student: findStudent?._id,
    lesson,
  });
  if (!booking) return next(new ApiError("Error connection try again."));

  // Update lesson
  const updateLesson = await Lesson.findByIdAndUpdate(
    lesson,
    {
      $addToSet: { studentsRequests: student },
    },
    { new: true }
  );

  // Results
  return res.json(
    new ApiSuccess("Reservation has been sent successfully 🎉", {
      booking,
      updateLesson,
    })
  );
});

const accepted = asyncHandler(async (req, res, next) => {
  const { teacher, student, lesson, booking } = req.body;

  // update Booking
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
      $set: { status: "booked" },
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
  const { student, lesson, booking } = req.body;

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
  });

  // Remove the booking
  req.query = { _id: booking._id };
  await remove(req, res, next);

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
};
