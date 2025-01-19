const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");

const register = [
  check("name").notEmpty().withMessage("name is required."),
  check("email").notEmpty().withMessage("email is required."),
  check("address").notEmpty().withMessage("address is required."),
  check("country").notEmpty().withMessage("country is required."),
  check("city").notEmpty().withMessage("city is required."),
  check("phoneNumber").notEmpty().withMessage("phoneNumber is required."),
  check("age").notEmpty().withMessage("age is required."),
  check("password").notEmpty().withMessage("password is required."),
  check("status")
    .notEmpty()
    .withMessage("select tutor or student is required.")
    .isIn(["tutor", "student"])
    .withMessage("status must be one of the following: tutor, student."),
  validatorMiddlewares,
];

const login = [
  check("email").notEmpty().withMessage("email is required."),
  check("password").notEmpty().withMessage("password is required."),
  validatorMiddlewares,
];

const validation = {
  register,
  login,
};
module.exports = validation;
