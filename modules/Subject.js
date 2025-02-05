const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name must be unique"],
    },
    bio: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Subject", SubjectSchema);
