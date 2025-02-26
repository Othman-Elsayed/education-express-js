const asyncHandler = require("express-async-handler");
const Chat = require("../modules/Chat");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ members: req.user._id })
    .populate({ path: "members", select: "name role" })
    .populate({
      path: "lastMsg",
      select: "text isRead sender createdAt",
    });
  return res.json(new ApiSuccess("Fetch chats successfully.", chats));
});
const byId = asyncHandler(async (req, res) => {
  const chats = await Chat.findById({ _id: req.query?._id });
  return res.json(new ApiSuccess("Fetch chats successfully.", chats));
});
const create = asyncHandler(async (req, res) => {
  const { members } = req.body;
  const chat = await Chat.create({ members });
  return res.json(new ApiSuccess("Created chat successfully", chat));
});
const update = asyncHandler(async (req, res) => {
  const { _id, typeUpdate, lastMsg } = req.body;
  const obj = {};
  if (typeUpdate === "UPDATE_LAST_MSG") {
    obj.$set = { lastMsg };
  }
  if (typeUpdate === "CLEAR_NOTIFICATIONS") {
    obj.msgsUnread = 0;
  }
  if (typeUpdate === "ADD_NOTIFICATIONS") {
    obj.$inc = { msgsUnread: 1 };
  }
  const chat = await Chat.findByIdAndUpdate(_id, obj, { new: true });
  return res.json(new ApiSuccess("Updated chat successfully", chat));
});

const remove = asyncHandler(async (req, res) => {
  const chat = await Chat.findByIdAndDelete(req.query._id);
  return res.json(new ApiSuccess("Deleted chat successfully", chat));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
  byId,
};
