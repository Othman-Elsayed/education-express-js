const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const updateOne = ({ Schema }) =>
  asyncHandler(async (req, res, next) => {
    const data = await Schema.findByIdAndUpdate(
      req?.body?._id,
      { ...req.body },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    if (!data) return next(new ApiError("invalid details."));
    return res.json(new ApiSuccess(data, "updated successfully."));
  });

module.exports = updateOne;
