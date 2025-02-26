const asyncHandler = require("express-async-handler");
const Message = require("../modules/Message");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const messages = await Message.find({ chat: req.query.chat });
  return res.json(new ApiSuccess("Fetch messages successfully.", messages));
});
const create = asyncHandler(async (req, res) => {
  const message = await Message.create(req.body);
  return res.json(new ApiSuccess("Created message successfully", message));
});
const update = asyncHandler(async (req, res) => {
  const { _id, text } = req.body;
  const message = await Message.findByIdAndUpdate(
    _id,
    { text, edited: true },
    {
      new: true,
    }
  );
  return res.json(new ApiSuccess("Updated message successfully", message));
});
const updateToRead = asyncHandler(async (req, res) => {
  const msgs = await Message.updateMany(
    { sender: req.query.sender, isRead: false, chat: req.query.chat },
    { $set: { isRead: true } }
  );
  return res.json(new ApiSuccess("read msgs successfully", msgs));
});
const remove = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.query._id);
  return res.json(new ApiSuccess("Deleted message successfully", message));
});
module.exports = {
  getAll,
  create,
  update,
  remove,
  updateToRead,
};
