const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  studentsBooked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  studentsRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
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
  price: {
    type: String,
  },
  status: {
    type: String,
    enum: ["init", "booked", "notBooked"],
    default: "init",
  },
});

module.exports = mongoose.model("Lecture", LectureSchema);
