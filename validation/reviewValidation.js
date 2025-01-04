const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Student = require("../modules/StudentSchema");
const Tutor = require("../modules/TutorSchema");
const singleValidator = [
  check("reviewId")
    .notEmpty()
    .withMessage("review id params is required.")
    .isMongoId()
    .withMessage("invalid review id."),
  validatorMiddlewares,
];
const createValidator = [
  check("studentId")
    .notEmpty()
    .withMessage("student id is required.")
    .isMongoId()
    .withMessage("invalid format student id.")
    .custom(async (studentId) => {
      const find = await Student.findById(studentId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("tutorId")
    .notEmpty()
    .withMessage("tutor id is required.")
    .isMongoId()
    .withMessage("invalid format tutor id.")
    .custom(async (tutorId) => {
      const find = await Tutor.findById(tutorId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("rating")
    .notEmpty()
    .withMessage("rating is required.")
    .isNumeric()
    .withMessage("rating must be number.")
    .isLength({ min: 1 })
    .withMessage("value must be at least 1")
    .isLength({ max: 5 })
    .withMessage("value must not exceed 5"),
  validatorMiddlewares,
];

const updateValidator = [
  check("_id")
    .notEmpty()
    .withMessage("review id is required.")
    .isMongoId()
    .withMessage("invalid student id."),
  check("studentId")
    .optional()
    .isMongoId()
    .withMessage("invalid student id.")
    .custom(async (studentId) => {
      const find = await Student.findById(studentId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("tutorId")
    .optional()
    .isMongoId()
    .withMessage("invalid tutor id.")
    .custom(async (tutorId) => {
      const find = await Tutor.findById(tutorId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("rating")
    .optional()
    .isNumeric()
    .withMessage("rating must be number.")
    .isLength({ min: 1 })
    .withMessage("value must be at least 1")
    .isLength({ max: 5 })
    .withMessage("value must not exceed 5"),
  validatorMiddlewares,
];

const deleteValidator = [
  check("reviewId")
    .notEmpty()
    .withMessage("review id params is required.")
    .isMongoId()
    .withMessage("invalid review id."),
  validatorMiddlewares,
];

const validation = {
  singleValidator,
  createValidator,
  updateValidator,
  deleteValidator,
};
module.exports = validation;
