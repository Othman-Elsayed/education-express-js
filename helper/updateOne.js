const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const updateOne = ({ Schema }) =>
  asyncHandler(async (req, res, next) => {
    // let data = await Schema.findByIdAndUpdate(
    //   req?.body?._id,
    //   { ...req.body, avatar: req.file.path || null },
    //   {
    //     new: true,
    //     runValidators: true,
    //     context: "query",
    //   }
    // );
    // if (!data) return next(new ApiError("invalid details."));
    // if (data?._doc) {
    //   let { __v, password, ...results } = data?._doc;
    //   data = results;
    // }
    let data = [];
    console.log(req.file.path);

    return res.json(new ApiSuccess(data, "updated successfully."));
  });

module.exports = updateOne;
