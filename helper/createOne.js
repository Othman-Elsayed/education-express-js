const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");

const createOne = ({ Schema }) =>
  asyncHandler(async (req, res) => {
    const data = await Schema.create({ ...req.body });
    return res.json(new ApiSuccess(data, "created successfully."));
  });

module.exports = createOne;
