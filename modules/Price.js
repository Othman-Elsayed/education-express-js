const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema(
  {
    educationSystem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationSystem",
    },
    sessions: {
      type: Number,
      default: 1,
    },
    fullFees: String,
    teacher: String,
    platform: String,
    isGroup: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["oneToOne", "oneToOneBundle"],
      default: "oneToOne",
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

module.exports = mongoose.model("Price", PriceSchema);
