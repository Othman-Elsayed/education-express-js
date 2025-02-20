const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    replay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    msgReplay: {
      type: String,
    },
    text: {
      type: String,
    },
    img: {
      type: String,
    },
    isRead: {
      type: Boolean,
    },
    edited: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", MessageSchema);
