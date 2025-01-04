const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Tutor = require("../modules/TutorSchema");
const User = require("../modules/UserSchema");
const Subject = require("../modules/SubjectSchema");
const singleValidator = [
  check("userId")
    .notEmpty()
    .withMessage("user id params is required.")
    .isMongoId()
    .withMessage("invalid user id."),
  validatorMiddlewares,
];
const createValidator = [
  check("userId")
    .notEmpty()
    .withMessage("user id params is required.")
    .isMongoId()
    .withMessage("invalid user id.")
    .custom(async (userId) => {
      const find = await User.findById(userId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
      if (find?.role !== "tutor") {
        throw new Error(`invalid details.`);
      }
    })
    .custom(async (userId) => {
      const find = await Tutor.findOne({ userId });
      if (find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("subjectIds")
    .notEmpty()
    .withMessage("subject ids are required.")
    .isArray()
    .withMessage("subject ids must be an array.")
    .custom((subjectIds) => {
      if (!Array.isArray(subjectIds)) {
        throw new Error("subject IDs must be an array.");
      }
      const uniqueIds = new Set(subjectIds.map((id) => id.toString()));
      if (uniqueIds.size !== subjectIds.length) {
        throw new Error("Duplicate subject IDs are not allowed.");
      }

      return true;
    }),
  check("subjectIds.*")
    .isMongoId()
    .withMessage("invalid subject ids.")
    .custom(async (id) => {
      const subject = await Subject.findById(id);
      if (!subject) {
        throw new Error(`invalid subject ${id}.`);
      }
    }),
  check("hourlyRate")
    .notEmpty()
    .withMessage("hourly rate is required.")
    .isNumeric()
    .withMessage("hourly rate must be number."),
  check("evaluation")
    .optional()
    .isNumeric()
    .withMessage("evaluation must be number."),
  check("startTutoring")
    .notEmpty()
    .withMessage("start tutoring is required.")
    .isNumeric()
    .withMessage("start tutoring must be number."),
  check("experience")
    .optional()
    .isArray()
    .withMessage("experience must be array of object."),
  check("education")
    .optional()
    .isArray()
    .withMessage("experience must be array of object."),

  validatorMiddlewares,
];

const updateValidator = [
  check("userId")
    .optional()
    .isMongoId()
    .withMessage("invalid user id.")
    .custom(async (userId) => {
      const find = await User.findById(userId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
      if (find?.role !== "tutor") {
        throw new Error(`invalid details.`);
      }
    }),
  check("subjectIds")
    .notEmpty()
    .withMessage("subject ids are required.")
    .isArray()
    .withMessage("subject ids must be an array.")
    .custom((subjectIds) => {
      const uniqueIds = new Set(subjectIds.map((id) => id.toString()));
      if (uniqueIds?.size !== subjectIds?.length) {
        throw new Error(`duplicate subject ids are not allowed..`);
      }
      return true;
    }),
  check("subjectIds.*")
    .isMongoId()
    .withMessage("invalid subject ids.")
    .custom(async (id) => {
      const subject = await Subject.findById(id);
      if (!subject) {
        throw new Error(`invalid subject ${id}.`);
      }
    }),
  check("_id")
    .notEmpty()
    .withMessage("touter id params is required.")
    .isMongoId()
    .withMessage("invalid touter id."),
  check("hourlyRate")
    .optional()
    .isNumeric()
    .withMessage("hourly rate must be number."),
  check("evaluation")
    .optional()
    .isNumeric()
    .withMessage("evaluation must be number."),
  check("startTutoring")
    .optional()
    .isNumeric()
    .withMessage("evaluation must be number."),
  check("experience")
    .optional()
    .isArray()
    .withMessage("experience must be array of object."),
  check("education")
    .optional()
    .isArray()
    .withMessage("experience must be array of object."),

  validatorMiddlewares,
];

const deleteValidator = [
  check("userId")
    .notEmpty()
    .withMessage("user id params is required")
    .isMongoId()
    .withMessage("invalid user id."),
  validatorMiddlewares,
];

module.exports = {
  singleValidator,
  createValidator,
  updateValidator,
  deleteValidator,
};
