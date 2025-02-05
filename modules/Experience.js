const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name must be unique"],
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Experience", ExperienceSchema);
