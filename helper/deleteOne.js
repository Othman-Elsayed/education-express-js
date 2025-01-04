const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const deleteOne = ({ Schema, nameIdParam }) =>
  asyncHandler(async (req, res, next) => {
    const data = await Schema.findByIdAndDelete(req.params[nameIdParam]);
    if (!data) return next(new ApiError("invalid details."));
    return res.json(new ApiSuccess(data, "fetch data successfully."));
  });

module.exports = deleteOne;
