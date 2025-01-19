const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required."],
      unique: true,
    },
    img: {
      type: String,
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    status: {
      type: String,
      enum: ["tutor", "student"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
