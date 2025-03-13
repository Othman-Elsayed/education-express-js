const asyncHandler = require("express-async-handler");
const Notification = require("../modules/Notification");
const ApiSuccess = require("../utils/apiSuccess");
const getAll = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().populate(
    "from to",
    "name img"
  );
  return res.json(
    new ApiSuccess("Fetch notifications successfully.", notifications)
  );
});
const create = asyncHandler(async (req, res) => {
  const { from, to, msg } = req.body;
  const notification = await Notification.create({ from, to, msg });
  return res.json(
    new ApiSuccess("Created notification successfully", notification)
  );
});
const update = asyncHandler(async (req, res) => {
  const { _id, from, to, msg } = req.body;
  const notification = await Notification.findByIdAndUpdate(
    _id,
    { from, to, msg },
    {
      new: true,
    }
  );
  return res.json(
    new ApiSuccess("Updated notification successfully", notification)
  );
});
const remove = asyncHandler(async (req, res, next) => {
  await Notification.findByIdAndDelete(req.query._id);
  return res.json(
    new ApiSuccess("Deleted notification successfully", notification)
  );
});

module.exports = {
  getAll,
  create,
  update,
  remove,
};
