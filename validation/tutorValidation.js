const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Tutor = require("../modules/TutorSchema");
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
  check("email").notEmpty().withMessage("email is required."),
  check("phoneNumber").notEmpty().withMessage("phoneNumber is required."),
  check("password").notEmpty().withMessage("password is required."),
  check("address").notEmpty().withMessage("address is required."),
  check("country").notEmpty().withMessage("country is required."),
  check("city").notEmpty().withMessage("city is required."),
  check("age").notEmpty().withMessage("age is required."),
  check("bio").notEmpty().withMessage("bio is required."),
  check("daysAvailable").notEmpty().withMessage("daysAvailable is required."),
  check("subjects")
    .notEmpty()
    .withMessage("subjects is required")
    .isArray()
    .withMessage("subjects must be array"),
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
  check("levelsGrades")
    .notEmpty()
    .withMessage("levelsGrades is required")
    .isArray()
    .withMessage("levelsGrades must be array"),
  check("levelsGrades.*")
    .optional()
    .isMongoId()
    .withMessage("All levelsGrades must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await LevelsGrades.findById(id);
      if (!exists) {
        throw new Error(`levelsGrades with ID ${id} does not exist.`);
      }
    }),
  check("schoolSystems")
    .notEmpty()
    .withMessage("schoolSystems is required")
    .isArray()
    .withMessage("schoolSystems must be array"),
  check("schoolSystems.*")
    .optional()
    .isMongoId()
    .withMessage("All schoolSystem must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await SchoolSystems.findById(id);
      if (!exists) {
        throw new Error(`schoolSystem with ID ${id} does not exist.`);
      }
    }),
  check("educations")
    .optional()
    .isArray()
    .withMessage("schoolSystem must be array"),
  check("experiences")
    .optional()
    .isArray()
    .withMessage("schoolSystem must be array"),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("tutor _id is required.")
    .isMongoId()
    .withMessage("tutor _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Tutor.findById(id);
      if (!exists) {
        throw new Error(`Tutor with ID ${id} does not exist.`);
      }
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
  check("levelsGrades")
    .optional()
    .isArray()
    .withMessage("levelsGrades must be array"),
  check("levelsGrades.*")
    .optional()
    .isMongoId()
    .withMessage("All levelsGrades must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await LevelsGrades.findById(id);
      if (!exists) {
        throw new Error(`levelsGrades with ID ${id} does not exist.`);
      }
    }),
  check("schoolSystems")
    .optional()
    .isArray()
    .withMessage("schoolSystems must be array"),
  check("schoolSystems.*")
    .optional()
    .isMongoId()
    .withMessage("All schoolSystem must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await SchoolSystems.findById(id);
      if (!exists) {
        throw new Error(`schoolSystem with ID ${id} does not exist.`);
      }
    }),
  check("educations")
    .optional()
    .isArray()
    .withMessage("schoolSystem must be array"),
  check("experiences")
    .optional()
    .isArray()
    .withMessage("schoolSystem must be array"),
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
