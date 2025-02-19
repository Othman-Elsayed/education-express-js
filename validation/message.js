const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");

const getAll = [
  check("chat")
    .notEmpty()
    .withMessage("chat _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const updateToRead = [
  check("chat")
    .notEmpty()
    .withMessage("chat _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  check("sender")
    .notEmpty()
    .withMessage("sender _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];

const create = [
  check("chat").notEmpty().withMessage("chat is required."),
  check("sender").notEmpty().withMessage("sender is required."),
  check("text").notEmpty().withMessage("text is required."),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("message _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];

const remove = [
  check("_id")
    .notEmpty()
    .withMessage("message _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
module.exports = {
  create,
  getAll,
  remove,
  update,
  updateToRead,
};
