const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Chat = require("../modules/Chat");
const User = require("../modules/User");
const byId = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("_id must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const getAll = [
  check("userId")
    .notEmpty()
    .withMessage("userId params is required.")
    .isMongoId()
    .withMessage("userId must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const create = [
  check("student")
    .notEmpty()
    .withMessage("student is required.")
    .isMongoId()
    .withMessage("student _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists || exists?.role !== "student") {
        throw new Error(`student with ID ${id} does not exist.`);
      }
    }),
  check("teacher")
    .notEmpty()
    .withMessage("teacher is required.")
    .isMongoId()
    .withMessage("teacher _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists || exists?.role !== "teacher") {
        throw new Error(`teacher with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const update = [
  check("_id")
    .notEmpty()
    .withMessage("Chat _id is required.")
    .isMongoId()
    .withMessage("Chat _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Chat.findById(id);
      if (!exists) {
        throw new Error(`Chat with ID ${id} does not exist.`);
      }
    }),
  check("student")
    .optional()
    .isMongoId()
    .withMessage("student _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await User.findById(id);
      if (!exists || exists?.role !== "student") {
        throw new Error(`student with ID ${id} does not exist.`);
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
  validatorMiddlewares,
];
const remove = [
  check("_id")
    .notEmpty()
    .withMessage("Chat _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
module.exports = {
  create,
  update,
  remove,
  byId,
  getAll,
};
