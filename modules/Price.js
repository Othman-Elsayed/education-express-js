const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema(
  {
    title: String,
    fullFees: String,
    teacher: String,
    platform: String,
    educationSystem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EducationSystem",
      },
    ],
    sessions: {
      type: Number,
      default: 1,
    },
    isGroup: {
      type: Boolean,
      default: false,
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
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Price", PriceSchema);
