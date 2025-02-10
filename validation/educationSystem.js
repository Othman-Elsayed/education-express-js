const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Levels = require("../modules/Level");

const byId = [
  check("_id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
const create = [
  check("name").notEmpty().withMessage("name is required."),
  check("levels")
    .notEmpty()
    .withMessage("levels is required")
    .isArray()
    .withMessage("levels must be array"),
  check("levels.*")
    .optional()
    .isMongoId()
    .withMessage("All levels must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await Levels.findById(id);
      if (!exists) {
        throw new Error(`Level with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("_id is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  check("levels").optional().isArray().withMessage("levels must be array"),
  check("levels.*")
    .optional()
    .isMongoId()
    .withMessage("All levels must be valid MongoDB ObjectIDs.")
    .custom(async (id) => {
      const exists = await Levels.findById(id);
      if (!exists) {
        throw new Error(`Level with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const remove = [
  check("_id")
    .notEmpty()
    .withMessage("_id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];

module.exports = {
  byId,
  create,
  update,
  remove,
};
