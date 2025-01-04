const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    experience: [
      {
        name: { type: String },
        subName: { type: String },
        yearsCount: { type: String },
      },
    ],
    education: [
      {
        name: { type: String },
        subName: { type: String },
      },
    ],
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    evaluation: {
      type: Number,
      default: 0,
    },
    startTutoring: {
      type: Number,
      required: true,
    },
    verifiedAccount: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tutor", tutorSchema);
