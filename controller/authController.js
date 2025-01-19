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

const saltRounds = 10;

const register = asyncHandler(async (req, res) => {
  const { password, role, ...otherFields } = req.body;
  const hashPassword = await bcrypt.hash(password?.toString(), saltRounds);

  const user = await User.create({
    ...otherFields,
    role: role === "admin" ? "student" : role,
    password: hashPassword,
  });

  const accessToken = generateAccessToken({ id: user._id?.toString() });
  const refreshToken = generateRefreshToken({ id: user._id?.toString() });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  user.password = undefined;
  user.__v = undefined;
  return res.json({ ...user?._doc, accessToken, refreshToken });
});

const login = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;
  const findUser = await User.findOne({ email }).exec();

  if (!findUser) {
    return next(new ApiError("user dose not exist."));
  }
  const comparePassword = await bcrypt.compare(
    password?.toString(),
    findUser.password?.toString()
  );

  if (!comparePassword) {
    return next(new ApiError("invalid password or email."));
  }

  const accessToken = generateAccessToken({ id: findUser._id?.toString() });
  const refreshToken = generateRefreshToken({ id: findUser._id?.toString() });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  findUser.password = undefined;
  findUser.__v = undefined;
  return res.json(
    new ApiSuccess(
      { ...findUser?._doc, accessToken, refreshToken },
      "login successfully."
    )
  );
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    return next(new ApiError("No refresh token found. Please log in."));
  }
  jsonwebtoken.verify(
    cookie.refreshToken,
    process.env.REFRESH_JWT_TOKEN,
    async (err, decoded) => {
      if (err) return next(new ApiError("invalid refresh token."));
      const findUser = await User.findById(decoded?.data?.id);
      if (!findUser) {
        return next(new ApiError("user dose not exist."));
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
