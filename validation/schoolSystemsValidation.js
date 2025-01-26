const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");

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
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("_id is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
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
};
module.exports = validation;
