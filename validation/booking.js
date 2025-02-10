const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Booking = require("../modules/Booking");
const Lesson = require("../modules/Lesson");
const User = require("../modules/User");

const byId = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("Booking _id must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const send = [
  check("student")
    .notEmpty()
    .withMessage("student id is required.")
    .custom(async (val) => {
      const findStudent = await User.findById(val);
      if (!findStudent && findStudent.role !== "student") {
        return new Error(`student not found.`);
      }
    }),
  check("lesson")
    .notEmpty()
    .withMessage("lesson id is required.")
    .custom(async (val) => {
      const findLesson = await Lesson.findById(val);
      if (!findLesson) {
        return new Error(`Lesson not found.`);
      }
    }),
  validatorMiddlewares,
];
const accepted = [
  check("student")
    .notEmpty()
    .withMessage("student id is required.")
    .custom(async (val) => {
      const findStudent = await User.findById(val);
      if (!findStudent && findStudent.role !== "student") {
        return new Error(`student not found.`);
      }
    }),
  check("lesson")
    .notEmpty()
    .withMessage("lesson id is required.")
    .custom(async (val) => {
      const findLesson = await Lesson.findById(val);
      if (!findLesson) {
        return new Error(`Lesson not found.`);
      }
    }),
  check("booking")
    .notEmpty()
    .withMessage("booking id is required.")
    .custom(async (val) => {
      const findBooking = await Booking.findById(val);
      if (!findBooking) {
        return new Error(`Booking not found.`);
      }
    }),
  validatorMiddlewares,
];
const reject = [
  check("student")
    .notEmpty()
    .withMessage("student id is required.")
    .custom(async (val) => {
      const findStudent = await User.findById(val);
      if (!findStudent && findStudent.role !== "student") {
        return new Error(`student not found.`);
      }
    }),
  check("lesson")
    .notEmpty()
    .withMessage("lesson id is required.")
    .custom(async (val) => {
      const findLesson = await Lesson.findById(val);
      if (!findLesson) {
        return new Error(`Lesson not found.`);
      }
    }),
  check("booking")
    .notEmpty()
    .withMessage("booking id is required.")
    .custom(async (val) => {
      const findBooking = await Booking.findById(val);
      if (!findBooking) {
        return new Error(`Booking not found.`);
      }
    }),
  validatorMiddlewares,
];
module.exports = {
  byId,
  send,
  accepted,
  reject,
};
