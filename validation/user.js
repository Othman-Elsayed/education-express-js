const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Subject = require("../modules/Subject");
const EducationSystem = require("../modules/EducationSystem");

const byId = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("_id must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const ban = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("_id must be valid MongoDB ObjectID."),
  check("ban").notEmpty().withMessage("ban params is required."),
  validatorMiddlewares,
];
const update = [
  check("subject")
    .optional()
    .isMongoId()
    .withMessage("subject must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  check("educationSystem")
    .optional()
    .isMongoId()
    .withMessage("educationSystem _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await EducationSystem.findById(id);
      if (!exists) {
        throw new Error(`EducationSystem with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
module.exports = {
  byId,
  update,
  ban,
};
