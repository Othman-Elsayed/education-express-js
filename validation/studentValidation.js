const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Student = require("../modules/StudentSchema");
const User = require("../modules/UserSchema");
const singleValidator = [
  check("studentId")
    .notEmpty()
    .withMessage("user id params is required.")
    .isMongoId()
    .withMessage("invalid user id."),
  validatorMiddlewares,
];
const createValidator = [
  check("userId")
    .notEmpty()
    .withMessage("user id params is required.")
    .isMongoId()
    .withMessage("invalid user id.")
    .custom(async (userId) => {
      const find = await User.findById(userId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
      if (find.role === "tutor") {
        throw new Error(`cant this account student.`);
      }
    })
    .custom(async (userId) => {
      const find = await Student.findOne({ userId });
      if (find) {
        throw new Error(`invalid details.`);
      }
    }),

  validatorMiddlewares,
];

const updateValidator = [
  check("userId")
    .optional()
    .isMongoId()
    .withMessage("invalid user id.")
    .custom(async (userId) => {
      const find = await User.findById(userId);
      if (!find) {
        throw new Error(`invalid details.`);
      }
    }),
  check("_id")
    .notEmpty()
    .withMessage("touter id params is required.")
    .isMongoId()
    .withMessage("invalid touter id."),
  validatorMiddlewares,
];

const deleteValidator = [
  check("studentId")
    .notEmpty()
    .withMessage("user id params is required")
    .isMongoId()
    .withMessage("invalid user id."),
  validatorMiddlewares,
];

const validation = {
  singleValidator,
  createValidator,
  updateValidator,
  deleteValidator,
};
module.exports = validation;
