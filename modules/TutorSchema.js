const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    gander: {
      type: String,
    },
    status: {
      type: String,
      default: "tutor",
    },
    age: {
      type: String,
      required: [true, "age is required"],
    },
    verifiedAccount: {
      type: Boolean,
    },
    bio: {
      type: String,
    },
    video: {
      type: String,
    },
    evaluation: {
      type: Number,
      default: 0,
    },
    hoursJop: {
      type: Number,
    },
    daysAvailable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    levelsGrades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LevelsGrades",
      },
    ],
    schoolSystems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SchoolSystems",
      },
    ],
    educations: [
      {
        name: { type: String },
        subName: { type: String },
      },
    ],
    experiences: [
      {
        name: { type: String },
        subName: { type: String },
        years: { type: String },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tutor", tutorSchema);
