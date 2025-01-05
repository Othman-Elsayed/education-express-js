const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const singleOne = ({
  Schema,
  nameIdParam,
  populateName,
  populateSelect,
  returnOne,
}) =>
  asyncHandler(async (req, res, next) => {
    let data = Schema.findById(req.params[nameIdParam]);
    if (!data) return next(new ApiError("invalid details."));
    if (populateName) {
      data.populate(populateName, populateSelect);
    }
    data = await data;
    if (returnOne) {
      data = data[returnOne];
    } else {
      if (data?._doc) {
        let { __v, password, ...results } = data?._doc;
        data = results;
      }
    }
    return res.json(new ApiSuccess(data, "fetch data successfully."));
  });

module.exports = singleOne;
