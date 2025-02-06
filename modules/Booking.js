const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    price: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Price",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "accepted"],
      default: "pending",
      lowercaseL: true,
      trim: true,
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

module.exports = mongoose.model("Booking", BookingSchema);
