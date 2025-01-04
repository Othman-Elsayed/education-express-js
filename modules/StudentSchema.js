const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gradeLevel: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
