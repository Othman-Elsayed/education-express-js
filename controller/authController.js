const asyncHandler = require("express-async-handler");
const User = require("../modules/UserSchema");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/apiError");
const ApiSuccess = require("../utils/apiSuccess");
const jsonwebtoken = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const register = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  let payload = { ...body, password: hashPassword };
  if (payload.role === "student") {
    payload = { ...payload, tutorInfo: null };
  }
  if (payload.role === "tutor") {
    payload = { ...payload, studentInfo: null };
  }
  // create user
  const user = await User.create(payload);

  // generate token
  const accessToken = generateAccessToken({ id: user._id?.toString() });
  const refreshToken = generateRefreshToken({ id: user._id?.toString() });

  // save cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //  return result
  const { password, __v, ...result } = user?._doc;
  return res.json({ ...result, accessToken, refreshToken });
});

const login = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  const findUser = await User.findOne({ email }).exec();

  if (!findUser) {
    return next(new ApiError("invalid details."));
  }
  const comparePassword = await bcrypt.compare(password, findUser.password);
  if (!comparePassword) {
    return next(new ApiError("invalid details."));
  }

  // generate token
  const accessToken = generateAccessToken({ id: findUser._id?.toString() });
  const refreshToken = generateRefreshToken({ id: findUser._id?.toString() });

  // save cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const { password: pas, __v, ...data } = findUser?._doc;
  return res.json(
    new ApiSuccess(
      { ...data, accessToken, refreshToken },
      "login successfully."
    )
  );
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    return next(new ApiError("expired refresh token."));
  }
  jsonwebtoken.verify(
    cookie.refreshToken,
    process.env.REFRESH_JWT_TOKEN,
    async (err, decoded) => {
      if (err) return next(new ApiError("invalid token."));
      const findUser = await User.findById(decoded?.data?.id);
      if (!findUser) {
        return next(new ApiError("invalid details."));
      }
      const accessToken = generateAccessToken({ id: findUser._id?.toString() });
      return res.json({
        status: "success",
        message: "refreshed token successfully.",
        accessToken,
      });
    }
  );
});

module.exports = {
  register,
  login,
  refreshToken,
};
