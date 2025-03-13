const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const User = require("../modules/User");
const Subject = require("../modules/Subject");
const EducationSystem = require("../modules/EducationSystem");

const register = [
  check("name").notEmpty().withMessage("name is required."),
  check("email").notEmpty().withMessage("email is required."),
  check("phoneNumber").notEmpty().withMessage("phoneNumber is required."),
  check("password").notEmpty().withMessage("password is required."),
  check("address").notEmpty().withMessage("address is required."),
  check("country").notEmpty().withMessage("country is required."),

  check("subjects")
    .notEmpty()
    .withMessage("subjects is required")
    .isArray()
    .withMessage("subjects must be array"),
  check("subjects.*")
    .optional()
    .isMongoId()
    .withMessage("All subjects must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  check("educationSystems")
    .notEmpty()
    .withMessage("EducationSystem is required")
    .isArray()
    .withMessage("EducationSystem must be array"),
  check("educationSystems.*")
    .optional()
    .isMongoId()
    .withMessage("All educationSystem must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await EducationSystem.findById(id);
      if (!exists) {
        throw new Error(`EducationSystem with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const login = [
  check("email").notEmpty().withMessage("email is required."),
  check("password").notEmpty().withMessage("password is required."),
  validatorMiddlewares,
];
module.exports = {
  login,
  register,
};
