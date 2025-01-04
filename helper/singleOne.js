const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const singleOne = ({ Schema, nameIdParam }) =>
  asyncHandler(async (req, res, next) => {
    const data = await Schema.findById(req.params[nameIdParam]);
    if (!data) return next(new ApiError("invalid details."));
    return res.json(new ApiSuccess(data, "fetch data successfully."));
  });

module.exports = singleOne;
