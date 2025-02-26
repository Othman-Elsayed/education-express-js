const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "fileName is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
module.exports = mongoose.model("Upload", UploadSchema);
