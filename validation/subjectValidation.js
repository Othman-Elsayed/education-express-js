const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const singleValidator = [
  check("subjectId")
    .notEmpty()
    .withMessage("subject id params is required.")
    .isMongoId()
    .withMessage("invalid subject id."),
  validatorMiddlewares,
];
const createValidator = [
  check("name").notEmpty().withMessage("name is required."),
  validatorMiddlewares,
];

const updateValidator = [
  check("_id")
    .notEmpty()
    .withMessage("touter id params is required.")
    .isMongoId()
    .withMessage("invalid touter id."),
  validatorMiddlewares,
];

const deleteValidator = [
  check("subjectId")
    .notEmpty()
    .withMessage("subject id params is required.")
    .isMongoId()
    .withMessage("invalid subject id."),
  validatorMiddlewares,
];

const validation = {
  singleValidator,
  createValidator,
  updateValidator,
  deleteValidator,
};
module.exports = validation;
