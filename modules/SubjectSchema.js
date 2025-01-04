const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: null,
    },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
