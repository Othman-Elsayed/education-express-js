const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const otpGenerator = require("otp-generator");

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
    { _id: findUser._id, role: findUser.role },
    process.env.JWT_TOKEN,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  const {
    __v,
    password: pas,
    createdAt,
    updatedAt,
    ...result
  } = findUser?._doc;
  return res
    .status(200)
    .json(new ApiSuccess("Login successfully", { ...result, token }));
});
const sendOTP = asyncHandler(async (req, res) => {
  const newOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const otpExpire = new Date.now() + 10 * 60;
  return res.status(200).json(new ApiSuccess("Logout successful"));
});
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  });
  return res.status(200).json(new ApiSuccess("Logout successful"));
});
module.exports = { register, login, logout };
