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
    age: {
      type: Number,
      required: [true, "Age is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      required: [true, "Role is required. Please select 'student', 'tutor'"],
      enum: ["student", "tutor"],
    },
    city: {
      type: String,
      required: [true, "City is required."],
    },
    country: {
      type: String,
      required: [true, "Country is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
    },
    studentInfo: {
      gradeLevel: {
        type: String,
      },
    },
    tutorInfo: {
      bio: String,
      hourlyRate: {
        type: Number,
        default: 0,
      },
      evaluation: {
        type: Number,
        default: 0,
      },
      startTutoring: {
        type: Date,
      },
      verifiedAccount: {
        type: Boolean,
        default: false,
      },
      subjectIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
      experience: [
        {
          name: String,
          subName: String,
          yearsCount: Number,
        },
      ],
      education: [
        {
          name: { type: String },
          subName: { type: String },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
