const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const Level = require("../modules/Level");
const create = [
  check("name").notEmpty().withMessage("name is required."),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("level _id is required.")
    .isMongoId()
    .withMessage("level _id must be valid MongoDB ObjectID.")
    .custom(async (id) => {
      const exists = await Level.findById(id);
      if (!exists) {
        throw new Error(`level with ID ${id} does not exist.`);
      }
    }),
  validatorMiddlewares,
];
const remove = [
  check("_id")
    .notEmpty()
    .withMessage("level _id params is required.")
    .isMongoId()
    .withMessage("must be valid MongoDB ObjectID."),
  validatorMiddlewares,
];
module.exports = {
  create,
  update,
  remove,
};
