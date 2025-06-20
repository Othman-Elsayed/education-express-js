const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "Invalid credential"],
    },
    phoneNumber: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      unique: [true, "name must be unique"],
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    educationSystems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EducationSystem",
      },
    ],
    levels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level",
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    evaluation: {
      type: Number,
      default: 0,
    },
    age: {
      type: String,
    },
    video: {
      type: String,
    },
    bio: {
      type: String,
    },
    img: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    ban: {
      type: String,
      enum: ["BANED", "NOT_BANED"],
      default: "NOT_BANED",
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);
UserSchema.pre("save", function (next) {
  if (["student", "admin"].includes(this.role)) {
    this.subjects = undefined;
    this.educationSystems = undefined;
    this.evaluation = undefined;
    this.video = undefined;
  }
  next();
});
module.exports = mongoose.model("User", UserSchema);
