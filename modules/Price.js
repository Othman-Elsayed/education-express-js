const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Price", PriceSchema);
