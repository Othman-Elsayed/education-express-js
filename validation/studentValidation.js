const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Student = require("../modules/StudentSchema");
const Subject = require("../modules/SubjectSchema");
const LevelsGrades = require("../modules/LevelsGradesSchema");
const SchoolSystems = require("../modules/SchoolSystemsSchema");

const byId = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const create = [
  check("name").notEmpty().withMessage("name is required."),
  check("password").notEmpty().withMessage("password is required."),
  check("phoneNumber").notEmpty().withMessage("phoneNumber is required."),
  check("email").notEmpty().withMessage("email is required."),
  check("address").notEmpty().withMessage("address is required."),
  check("country").notEmpty().withMessage("country is required."),
  check("city").notEmpty().withMessage("city is required."),
  check("subjects").optional().isArray().withMessage("subjects must be array"),
  check("subjects.*")
    .optional()
    .isMongoId()
    .withMessage("All subjects must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  check("gradeLevel")
    .notEmpty()
    .withMessage("gradeLevel is required.")
    .isMongoId()
    .withMessage("gradeLevel must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await LevelsGrades.findById(id);
      if (!exists) {
        throw new Error(`gradeLevel with ID ${id} does not exist.`);
      }
    }),
  check("schoolSystem")
    .notEmpty()
    .withMessage("schoolSystem is required.")
    .isMongoId()
    .withMessage("schoolSystem must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await SchoolSystems.findById(id);
      if (!exists) {
        throw new Error(`schoolSystem with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("student _id is required.")
    .isMongoId()
    .withMessage("student _id must be valid MongoDB ObjectID.")
    .custom(async (val) => {
      const findStudent = await Student.findById(val);
      if (!findStudent)
        throw new Error(`student with ID ${id} does not exist.`);
    }),
  check("subjects").optional().isArray().withMessage("subjects must be array"),
  check("subjects.*")
    .optional()
    .isMongoId()
    .withMessage("All subjects must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  check("gradeLevel")
    .optional()
    .isMongoId()
    .withMessage("gradeLevel must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await LevelsGrades.findById(id);
      if (!exists) {
        throw new Error(`gradeLevel with ID ${id} does not exist.`);
      }
    }),
  check("schoolSystem")
    .optional()
    .isMongoId()
    .withMessage("schoolSystem must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await SchoolSystems.findById(id);
      if (!exists) {
        throw new Error(`schoolSystem with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const remove = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];

const validation = {
  byId,
  create,
  update,
  remove,
};
module.exports = validation;
