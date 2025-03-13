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
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);
module.exports = mongoose.model("Level", LevelSchema);
