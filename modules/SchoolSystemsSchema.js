const mongoose = require("mongoose");

const schoolSystemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: { type: String },
    img: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SchoolSystems", schoolSystemsSchema);
