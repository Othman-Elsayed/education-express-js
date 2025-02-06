const asyncHandler = require("express-async-handler");
const Booking = require("../modules/Booking");
const Lesson = require("../modules/Lesson");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getBooking = asyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { _id: req.user.id };
  const bookings = await Booking.find(query);
  return res.json(new ApiSuccess("Fetch successfully.", bookings));
});

const sendBooking = asyncHandler(async (req, res, next) => {
  const { teacher, student, lesson, price } = req.body;

  // Create a new booking
  const booking = await Booking.create({
    teacher,
    student,
    lesson,
    price,
  });
  if (!booking) return next(new ApiError("Error connection try again."));

  // Update lesson
  let updateLesson = await Lesson.findById(lesson);
  updateLesson.studentsRequests = [
    ...updateLesson.studentsBooked.filter((e) => e !== student),
    student,
  ];
  await updateLesson.save();

  // Results
  return res.json(
    new ApiSuccess("Reservation has been sent successfully 🎉", {
      booking,
      updateLesson,
    })
  );
});

const acceptedBooking = asyncHandler(async (req, res, next) => {
  const { student, lesson, booking } = req.body;

  // update Booking
  const newBooking = await Booking.findByIdAndUpdate(
    booking,
    { status: "completed" },
    { new: true }
  );
  if (!newBooking) return next(new ApiError("Error connection try again."));

  // Update Lesson
  let updateLesson = await Lesson.findById(lesson);
  updateLesson.studentsRequests = [
    ...updateLesson.studentsRequests.filter((e) => e !== student),
  ];
  updateLesson.studentsBooked = [
    ...updateLesson.studentsBooked.filter((e) => e !== student),
    student,
  ];
  updateLesson.status = "booked";
  await updateLesson.save();

  // Results
  return res.json(
    new ApiSuccess("Booking has been accepted successfully. 🎉", {
      updateLesson,
      booking,
    })
  );
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
  let updateLesson = await Lesson.findById(lesson);
  updateLesson.studentsRequests = updateLesson.studentsRequests.filter(
    (e) => e !== student
  );
  updateLesson.studentsBooked = updateLesson.studentsBooked.filter(
    (e) => e !== student
  );
  updateLesson.status = "notbooked";
  await updateLesson.save();

  // Results
  return res.json(
    new ApiSuccess("Booking has been rejected successfully. 🎉", {
      updateLesson,
      booking,
    })
  );
});

module.exports = {
  getBooking,
  sendBooking,
  acceptedBooking,
  rejectBooking,
};
