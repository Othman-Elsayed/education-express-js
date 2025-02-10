const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");

const byId = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("_id must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
module.exports = {
  byId,
};
