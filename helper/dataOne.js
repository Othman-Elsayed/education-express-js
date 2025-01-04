const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");

const dataOne = ({ Schema, populateName, populateSelect }) =>
  asyncHandler(async (req, res) => {
    let data = Schema.find({});
    if (populateName) {
      data.populate(populateName, populateSelect);
    }
    data = await data;
    return res.json(new ApiSuccess(data, "fetch data successfully."));
  });

module.exports = dataOne;
