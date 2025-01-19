const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const User = require("../modules/UserSchema");
const Student = require("../modules/StudentSchema");
const byId = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("invalid id."),
  validatorMiddlewares,
];
const create = [
  check("userId")
    .notEmpty()
    .withMessage("'userId' is required.")
    .isMongoId()
    .withMessage("invalid 'userId'.")
    .custom(async (val) => {
      const findUser = await User.findById(val);
      if (!findUser) {
        throw new Error(`user dose not exist.`);
      }
      if (findUser?.status === "tutor") {
        throw new Error(`invalid details.`);
      }
    })
    .custom(async (val) => {
      const findStudent = await Student.findOne({ userId: val });
      if (findStudent) throw new Error(`this account already exist.`);
    }),
  check("gradeLevel").notEmpty().withMessage("'gradeLevel' is required."),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("id body is required.")
    .isMongoId()
    .withMessage("invalid id.")
    .custom(async (val) => {
      const findStudent = await Student.findById(val);
      if (!findStudent) throw new Error(`student dose not exist.`);
    }),
  validatorMiddlewares,
];

const remove = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
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
