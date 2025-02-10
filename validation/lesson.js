const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Subject = require("../modules/Subject");
const Price = require("../modules/Price");
const User = require("../modules/Price");
const Lesson = require("../modules/Lesson");

const getAll = [
  check("userId")
    .notEmpty()
    .withMessage("userId params is required.")
    .isMongoId()
    .withMessage("userId must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const byId = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("_id must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const create = [
  check("day").notEmpty().withMessage("day is required."),
  check("startDate").notEmpty().withMessage("startDate is required."),
  check("endDate").notEmpty().withMessage("endDate is required."),
  check("teacher")
    .notEmpty()
    .withMessage("teacher is required.")
    .isMongoId()
    .withMessage("teacher must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists) {
        throw new Error(`teacher with ID ${id} does not exist.`);
      }
    }),
  check("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isMongoId()
    .withMessage("price must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Price.findById(id);
      if (!exists) {
        throw new Error(`Price with ID ${id} does not exist.`);
      }
    }),
  check("subject")
    .notEmpty()
    .withMessage("subject is required.")
    .isMongoId()
    .withMessage("subject must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
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
  check("subject")
    .optional()
    .isMongoId()
    .withMessage("subject must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const finished = [
  check("lesson")
    .optional()
    .isMongoId()
    .withMessage("lesson must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Lesson.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const remove = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
module.exports = { getAll, byId, create, update, remove, finished };
