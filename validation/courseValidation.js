const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Subject = require("../modules/SubjectSchema");
const Tutor = require("../modules/TutorSchema");
const singleValidator = [
  check("courseId")
    .notEmpty()
    .withMessage("course id params is required.")
    .isMongoId()
    .withMessage("invalid course id."),
  validatorMiddlewares,
];
const createValidator = [
  check("tutorId")
    .notEmpty()
    .withMessage("tutor id is required.")
    .isMongoId()
    .withMessage("invalid format tutor id.")
    .custom(async (tutorId) => {
      const find = await Tutor.findById(tutorId);
      console.log(find);
      if (!find) {
        console.log("find");
        throw new Error(`invalid details.`);
      }
    }),
  check("subjectId")
    .notEmpty()
    .withMessage("subject id is required.")
    .isMongoId()
    .withMessage("invalid format subject id.")
    .custom(async (subjectId) => {
      const find = await Subject.findById(subjectId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("title").notEmpty().withMessage("title is required."),
  check("price").notEmpty().withMessage("price is required."),
  validatorMiddlewares,
];

const updateValidator = [
  check("_id")
    .notEmpty()
    .withMessage("review id is required.")
    .isMongoId()
    .withMessage("invalid student id."),
  check("tutorId")
    .optional()
    .isMongoId()
    .withMessage("invalid format tutor id.")
    .custom(async (tutorId) => {
      const find = await Tutor.findById(tutorId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("subjectId")
    .optional()
    .isMongoId()
    .withMessage("invalid format subject id.")
    .custom(async (subjectId) => {
      const find = await Subject.findById(subjectId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("title").notEmpty().withMessage("title is required."),
  check("price").notEmpty().withMessage("price is required."),
  validatorMiddlewares,
];

const deleteValidator = [
  check("courseId")
    .notEmpty()
    .withMessage("course id params is required.")
    .isMongoId()
    .withMessage("invalid course id."),
  validatorMiddlewares,
];

const validation = {
  singleValidator,
  createValidator,
  updateValidator,
  deleteValidator,
};
module.exports = validation;
