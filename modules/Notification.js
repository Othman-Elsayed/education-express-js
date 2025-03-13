const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: ["To is required"],
      },
    ],
    msg: {
      type: String,
      required: ["Msg is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Notification", NotificationSchema);
