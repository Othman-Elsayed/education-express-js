const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
  daysAvailable: [
    {
      day: {
        name: { type: String, required: [true, "day is required"] },
        bg: { type: String },
      },
      time: { type: String, required: [true, "time is required"] },
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      levelGrade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LevelsGrades",
      },
      price: {
        type: String,
      },
    },
  ],
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
