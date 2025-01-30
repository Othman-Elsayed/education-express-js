const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
    },
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
    status: {
      type: String,
      enum: ["pending", "complete", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
