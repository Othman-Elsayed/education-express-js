const mongoose = require("mongoose");

const EducationSystem = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    bio: {
      type: String,
    },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
    levels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);
module.exports = mongoose.model("EducationSystem", EducationSystem);
