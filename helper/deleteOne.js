const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const deleteOne = ({ Schema, nameIdParam }) =>
  asyncHandler(async (req, res, next) => {
    let data = await Schema.findByIdAndDelete(req.params[nameIdParam]);
    if (!data) return next(new ApiError("invalid details."));
    if (data?._doc) {
      let { __v, password, ...results } = data?._doc;
      data = results;
    }
    return res.json(new ApiSuccess(data, "fetch data successfully."));
  });

module.exports = deleteOne;
