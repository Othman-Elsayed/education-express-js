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
    verifiedAccount: {
      type: Boolean,
    },
    evaluation: {
      type: Number,
      default: 0,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    startTutoring: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tutor", tutorSchema);
