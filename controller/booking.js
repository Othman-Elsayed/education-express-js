const asyncHandler = require("express-async-handler");
const Booking = require("../modules/Booking");
const Lesson = require("../modules/Lesson");
const Chat = require("../modules/Chat");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const User = require("../modules/User");

const getBooking = asyncHandler(async (req, res) => {
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

const sendBooking = asyncHandler(async (req, res, next) => {
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

const acceptedBooking = asyncHandler(async (req, res, next) => {
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

const rejectBooking = asyncHandler(async (req, res, next) => {
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

const remove = asyncHandler(async (req, res, next) => {
  const findBooking = await Booking.findById(req.query._id);
  if (findBooking.status === "accepted")
    return next(
      new ApiError("It will be deleted booking after the end of the session.")
    );

  // Delete Booking
  const deleteBooking = await Booking.findByIdAndDelete(req.query._id);
  if (!deleteBooking) return next(new ApiError("Error connection try again."));

  // Results
  return res.json(
    new ApiSuccess("Booking has been rejected successfully. 🎉", deleteBooking)
  );
});

module.exports = {
  getBooking,
  sendBooking,
  acceptedBooking,
  rejectBooking,
  remove,
};
