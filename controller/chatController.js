const Chat = require("../modules/ChatSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const getAll = asyncHandler(async (req, res) => {
  const data = await Chat.find();
  return res.json(new ApiSuccess(data, "Fetch chats successfully."));
});
const getById = asyncHandler(async (req, res) => {
  const data = await Chat.find({
    members: { $in: [req.query.userId] },
  });
  return res.json(new ApiSuccess(data, "Fetch chats successfully."));
});
const create = asyncHandler(async (req, res, next) => {
  const data = await Chat.create(req.body);
  if (!data) return next(new ApiError("Error create chat."));
  return res.json(new ApiSuccess(data, "Chat created successfully."));
});
const remove = asyncHandler(async (req, res, next) => {
  const data = await Chat.findByIdAndDelete(req.query.id);
  if (!data) return next(new ApiError("Invalid chat id."));
  return res.json(new ApiSuccess(data, "Chat deleted successfully."));
});

module.exports = {
  getAll,
  create,
  getById,
  remove,
};
