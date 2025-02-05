const { validationResult } = require("express-validator");

const validatorMiddlewares = (req, res, next) => {
  const err = validationResult(req);
  if (!err?.isEmpty()) {
    return res.status(404).json({
      status: "fail",
      message: "Error validation",
      errors: err.array(),
    });
  }
  next();
};

module.exports = validatorMiddlewares;
