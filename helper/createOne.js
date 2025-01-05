const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");

const createOne = ({ Schema }) =>
  asyncHandler(async (req, res) => {
    let data = await Schema.create({ ...req.body });
    if (data?._doc) {
      let { __v, password, ...results } = data?._doc;
      data = results;
    }
    return res.json(new ApiSuccess(data, "created successfully."));
  });

module.exports = createOne;
