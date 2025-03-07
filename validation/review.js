const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const User = require("../modules/User");
const Review = require("../modules/Review");

const create = [
  check("teacher")
    .notEmpty()
    .withMessage("teacher _id is required.")
    .isMongoId()
    .withMessage("teacher _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists || exists?.role !== "teacher") {
        throw new Error(`teacher with ID ${id} does not exist.`);
      }
    }),
  check("writer")
    .notEmpty()
    .withMessage("Writer _id is required.")
    .isMongoId()
    .withMessage("Writer _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists) {
        throw new Error(`Writer with ID ${id} does not exist.`);
      }
    }),
  check("comment").notEmpty().withMessage("comment is required."),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("review _id is required.")
    .isMongoId()
    .withMessage("review _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Review.findById(id);
      if (!exists) {
        throw new Error(`review with ID ${id} does not exist.`);
      }
    }),
  check("teacher")
    .optional()
    .isMongoId()
    .withMessage("teacher _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists || exists?.role !== "teacher") {
        throw new Error(`teacher with ID ${id} does not exist.`);
      }
    }),
  check("writer")
    .optional()
    .isMongoId()
    .withMessage("Writer _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists) {
        throw new Error(`Writer with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const getByTeacher = [
  check("_id")
    .notEmpty()
    .withMessage("review teacher _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists || exists?.role !== "teacher") {
        throw new Error(`teacher with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const remove = [
  check("_id")
    .notEmpty()
    .withMessage("subject _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];

module.exports = {
  create,
  update,
  remove,
  getByTeacher,
};
