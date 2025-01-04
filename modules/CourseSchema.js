const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
