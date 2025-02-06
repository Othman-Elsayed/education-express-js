const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
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
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
