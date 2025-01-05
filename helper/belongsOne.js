const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const belongsOne = ({ Schema, nameSearch, nameIdParam }) =>
  asyncHandler(async (req, res, next) => {
    let data = await Schema.find({ [nameSearch]: req.params[nameIdParam] });
    if (!data) return next(new ApiError("invalid details."));
    data = data?.map((e) => {
      const { __v, password, ...results } = e;
      return results;
    });
    return res.json(new ApiSuccess(data, "fetch data successfully."));
  });

module.exports = belongsOne;
