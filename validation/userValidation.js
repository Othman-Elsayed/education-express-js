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
  remove,
};
module.exports = validation;
