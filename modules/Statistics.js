const mongoose = require("mongoose");

const StatisticsSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    teacherPrice: {
      type: Number,
      default: 0,
    },
    studentPrice: {
      type: Number,
      default: 0,
    },
    platformPrice: {
      type: Number,
      default: 0,
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
module.exports = mongoose.model("Statistics", StatisticsSchema);
