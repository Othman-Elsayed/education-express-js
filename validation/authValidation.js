const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Tutor = require("../modules/TutorSchema");
const Student = require("../modules/StudentSchema");
const loginTutor = [
  check("email is required")
    .notEmpty()
    .withMessage("password is required.")
    .custom(async (email) => {
      const exists = await Tutor.findOne({ email });
      if (!exists) {
        throw new Error(`Tutor does not exist.`);
      }
    }),
  check("password").notEmpty().withMessage("password is required."),
  validatorMiddlewares,
];
const loginStudent = [
  check("email is required")
    .notEmpty()
    .withMessage("password is required.")
    .custom(async (email) => {
      const exists = await Student.findOne({ email });
      if (!exists) {
        throw new Error(`student does not exist.`);
      }
    }),
  check("password").notEmpty().withMessage("password is required."),
  validatorMiddlewares,
];
const validation = {
  loginTutor,
  loginStudent,
};
module.exports = validation;
