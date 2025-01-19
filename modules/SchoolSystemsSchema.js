const mongoose = require("mongoose");

const schoolSystemsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    subjectIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
    ],
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SchoolSystems", schoolSystemsSchema);
