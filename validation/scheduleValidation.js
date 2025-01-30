const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Tutor = require("../modules/TutorSchema");
const Subject = require("../modules/SubjectSchema");
const LevelsGrades = require("../modules/LevelsGradesSchema");
const byId = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const getByTutor = [
  check("tutorId")
    .notEmpty()
    .withMessage("tutorId params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Tutor.findById(id);
      if (!exists) {
        throw new Error(`Tutor with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const create = [
  check("day").notEmpty().withMessage("day is required."),
  check("time").notEmpty().withMessage("time is required."),
  check("tutor")
    .notEmpty()
    .withMessage("tutor id is required.")
    .custom(async (id) => {
      const exists = await Tutor.findById(id);
      if (!exists) {
        throw new Error(`Tutor with ID ${id} does not exist.`);
      }
    }),
  check("subject")
    .notEmpty()
    .withMessage("subject id is required.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  check("levelGrade")
    .notEmpty()
    .withMessage("levelGrade id is required.")
    .custom(async (id) => {
      const exists = await LevelsGrades.findById(id);
      if (!exists) {
        throw new Error(`levelGrade with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("_id is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  check("levelGrade")
    .optional()
    .isMongoId()
    .withMessage("levelGrade must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await LevelsGrades.findById(id);
      if (!exists) {
        throw new Error(`levelGrade with ID ${id} does not exist.`);
      }
    }),
  check("subject")
    .optional()
    .isMongoId()
    .withMessage("subject must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`subject with ID ${id} does not exist.`);
      }
    }),
  check("tutor")
    .optional()
    .isMongoId()
    .withMessage("tutor must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Tutor.findById(id);
      if (!exists) {
        throw new Error(`tutor with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const remove = [
  check("id")
    .notEmpty()
    .withMessage("id params is required")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];

const validation = {
  byId,
  create,
  update,
  remove,
  getByTutor,
};
module.exports = validation;
