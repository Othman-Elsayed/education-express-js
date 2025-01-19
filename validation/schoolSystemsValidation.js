const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Subject = require("../modules/SubjectSchema");
const User = require("../modules/UserSchema");
const byId = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("invalid id."),
  validatorMiddlewares,
];
const create = [
  check("name").notEmpty().withMessage("name is required."),
  check("subjectIds")
    .notEmpty()
    .withMessage("subjects ids is required.")
    .isArray()
    .withMessage("subjects ids must be array."),
  check("subjectIds.*")
    .isMongoId()
    .withMessage("Each subject id must be a valid id.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("id body is required.")
    .isMongoId()
    .withMessage("invalid id."),
  check("subjectIds")
    .optional()
    .isArray()
    .withMessage("subjects ids must be array."),
  check("subjectIds.*")
    .optional()
    .isMongoId()
    .withMessage("Each subject id must be a valid id.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
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
  create,
  update,
  remove,
};
module.exports = validation;
