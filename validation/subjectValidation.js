const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const byId = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("invalid id."),
  validatorMiddlewares,
];
const create = [
  check("name").notEmpty().withMessage("name is required."),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("id body is required.")
    .isMongoId()
    .withMessage("invalid id."),
  validatorMiddlewares,
];

const remove = [
  check("id")
    .notEmpty()
    .withMessage("id params is required")
    .isMongoId()
    .withMessage("invalid id."),
  validatorMiddlewares,
];

const validation = {
  byId,
  create,
  update,
  remove,
};
module.exports = validation;
