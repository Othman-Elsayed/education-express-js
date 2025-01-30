const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  gander: {
    type: String,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  gradeLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LevelsGrades",
    required: [true, "Levels grades is required"],
  },
  status: {
    type: String,
    default: "student",
  },
  schoolSystem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolSystems",
    required: [true, "School systems is required"],
  },
});

module.exports = mongoose.model("Student", studentSchema);
