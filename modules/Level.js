const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
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
module.exports = mongoose.model("Level", LevelSchema);
