const mongoose = require("mongoose");

const LectureRequestSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  timeStart: { type: String, required: [true, "time start is required"] },
  timeEnd: { type: String, required: [true, "time end is required"] },
  day: { type: String, required: [true, "day is required"] },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  schoolSystems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolSystems",
  },
  levelGrade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LevelsGrades",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});
module.exports = mongoose.model("LectureRequest", LectureRequestSchema);
