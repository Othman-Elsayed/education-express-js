const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  system: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EducationSystem",
  },
  levels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },
  ],
  fullFees: [
    {
      sessions: String,
      price: String,
    },
  ],
  teacher: [
    {
      sessions: String,
      price: String,
    },
  ],
  platform: [
    {
      sessions: String,
      price: String,
    },
  ],
  status: {
    type: String,
    enum: ["oneToOne", "oneToOneBundle", "group"],
    default: "oneToOne",
  },
});

module.exports = mongoose.model("Price", PriceSchema);
