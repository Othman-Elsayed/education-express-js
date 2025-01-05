const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");

const dataOne = ({ Schema, margeObj, populateName, populateSelect }) =>
  asyncHandler(async (req, res) => {
    let data = Schema.find({});
    if (populateName) {
      data.populate(populateName, populateSelect);
    }
    data = await data;
    if (margeObj) {
      data = data
        ?.map((e) => ({
          ...(e?.userId?._doc || {}),
          ...(e?._doc || {}),
        }))
        ?.map((e) => {
          const { __v, userId, ...rest } = e;
          return rest;
        });
    } else {
      data = data?.map((e) => {
        let { __v, password, ...results } = e?._doc;
        return results;
      });
    }
    return res.json(new ApiSuccess(data, "fetch data successfully."));
  });

module.exports = dataOne;
