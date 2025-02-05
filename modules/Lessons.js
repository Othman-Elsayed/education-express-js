const mongoose = require("mongoose");

const Lessons = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Price",
    },
    studentsRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    studentsBooked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    day: {
      type: String,
      require: [true, "Day is required"],
    },
    startTime: {
      type: String,
      require: [true, "Start Time is required"],
    },
    endTime: {
      type: String,
      require: [true, "End Time is required"],
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["init", "pending", "accepted", "rejected"],
      default: "init",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Lessons", Lessons);
