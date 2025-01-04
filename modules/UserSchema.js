const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required."],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: true,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
      required: [true, "age is required."],
    },
    password: {
      type: String,
      required: [true, "password is required."],
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      required: [
        true,
        "Role is required. Please select 'student', 'tutor', or 'admin'.",
      ],
      enum: ["student", "tutor", "admin"],
      validate: {
        validator: function (value) {
          return ["student", "tutor", "admin"].includes(value);
        },
        message: (props) =>
          `${props.value} is not a valid role. Please select 'student', 'tutor', or 'admin'.`,
      },
    },
    addresses: [
      {
        street: { type: String, required: [true, "street is required."] },
        city: { type: String, required: [true, "city is required."] },
        country: { type: String, required: [true, "country is required."] },
        state: { type: String },
        zip: { type: String },
        location: { type: String },
        long: { type: String },
        lat: { type: String },
      },
    ],
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
