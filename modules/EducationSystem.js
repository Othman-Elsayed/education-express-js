const mongoose = require("mongoose");

const EducationSystem = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name already exist"],
    },
    bio: {
      type: String,
    },
    img: {
      type: String,
    },
    levels: [
      {
        name: {
          type: String,
          required: [true, "name is required"],
          unique: [true, "name already exist"],
        },
        bio: {
          type: String,
        },
        img: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("EducationSystem", EducationSystem);
