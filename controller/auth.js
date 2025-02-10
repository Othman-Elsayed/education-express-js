const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");

const register = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phoneNumber,
    password,
    role,
    address,
    country,
    educationSystems,
    subjects,
    age,
    video,
    bio,
    img,
  } = req.body;
  const hasPas = await bcrypt.hash(password, 10);
  let newUser = {
    name,
    email,
    phoneNumber,
    password,
    address,
    country,
    educationSystems,
    subjects,
    age,
    video,
    bio,
    img,
    role: role?.toString()?.toLowerCase("")?.trim("")?.includes("admin")
      ? "student"
      : role,
    password: hasPas,
  };
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError("User with this email already exists"));
  }
  await User.create(newUser);
  return res.json(new ApiSuccess("Created account successfully."));
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return next(new ApiError("Invalid credentials", 401));
  }
  const isMatch = await bcrypt.compare(password, findUser.password);
  if (!isMatch) {
    return next(new ApiError("Invalid credentials", 401));
  }
  const token = jwt.sign(
    { id: findUser._id, role: findUser.role },
    process.env.JWT_TOKEN,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 3600000,
  });

  return res.status(200).json(new ApiSuccess("Login successful", findUser));
});

module.exports = { register, login };
