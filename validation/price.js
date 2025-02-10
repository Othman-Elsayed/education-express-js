const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Price = require("../modules/Price");
const create = [
  check("educationSystem")
    .notEmpty()
    .withMessage("educationSystem is required.")
    .isMongoId()
    .withMessage("educationSystem _id must be valid MongoDB ObjectID."),
  check("fullFees").notEmpty().withMessage("fullFees is required."),
  check("platform").notEmpty().withMessage("platform is required."),
  check("teacher").notEmpty().withMessage("teacher is required."),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("Price _id is required.")
    .isMongoId()
    .withMessage("Price _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Price.findById(id);
      if (!exists) {
        throw new Error(`Price with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const remove = [
  check("_id")
    .notEmpty()
    .withMessage("Price _id params is required.")
    .isMongoId()
    .withMessage("Price _id must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
module.exports = {
  create,
  update,
  remove,
};
