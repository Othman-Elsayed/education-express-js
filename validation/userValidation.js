const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const User = require("../modules/UserSchema");
const singleUserValidator = [
  check("userId")
    .notEmpty()
    .withMessage("user id params is required")
    .isMongoId()
    .withMessage("Invalid user id."),
  validatorMiddlewares,
];
const createUserValidator = [
  check("firstName").notEmpty().withMessage("firstName is required."),
  check("email")
    .notEmpty()
    .withMessage("email is required.")
    .custom(async (email) => {
      const findEmail = await User.findOne({ email });
      if (findEmail) {
        throw new Error(`invalid details.`);
      }
    }),
  check("gender")
    .notEmpty()
    .withMessage("gender is required you can write male or female or other."),
  check("age").notEmpty().withMessage("age is required."),
  check("password")
    .notEmpty()
    .withMessage("password is required.")
    .isLength({ min: 6 })
    .whitelist("password must be long and strong"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required.")
    .isNumeric()
    .withMessage("phone must be number."),
  check("role").notEmpty().withMessage("role is required."),
  check("addresses").notEmpty().withMessage("addresses is required."),

  validatorMiddlewares,
];

const updateUserValidator = [
  check("_id")
    .notEmpty()
    .withMessage("user _id is required.")
    .isMongoId()
    .withMessage("invalid user _id."),
  check("email")
    .optional()
    .custom(async (email, { req }) => {
      const findEmail = await User.findOne({ email });
      console.log("req", req.body._id);
      console.log("findEmail", findEmail);

      if (findEmail && findEmail._id.toString() !== req.body._id) {
        throw new Error(`invalid details.`);
      }
    }),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .whitelist("password must be long and strong"),
  validatorMiddlewares,
];

const deleteUserValidator = [
  check("userId")
    .notEmpty()
    .withMessage("user id params is required")
    .isMongoId()
    .withMessage("invalid user id."),
  validatorMiddlewares,
];

module.exports = {
  createUserValidator,
  singleUserValidator,
  updateUserValidator,
  deleteUserValidator,
  singleUserValidator,
};
