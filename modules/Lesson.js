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
    sessions: {
      type: Number,
      default: 0,
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
    startDate: {
      type: String,
      require: [true, "Start Time is required"],
    },
    endDate: {
      type: String,
      require: [true, "End Time is required"],
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["booked", "notbooked"],
      default: "notbooked",
      lowercaseL: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);
module.exports = mongoose.model("Lesson", Lessons);
