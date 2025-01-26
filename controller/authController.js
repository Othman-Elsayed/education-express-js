const Tutor = require("../modules/TutorSchema");
const Student = require("../modules/StudentSchema");
const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const ApiError = require("../utils/apiError");
const loginTutor = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;
  let findTutor = await Tutor.findOne({ email });
  if (!findTutor) return next(new ApiError("tutor dose not exist."));
  if (findTutor?.password === password && findTutor?.email === email) {
    return res.json(new ApiSuccess(findTutor, "Login Successfully."));
  } else {
    return next(new ApiError("email or password incorrect."));
  }
});
const loginStudent = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;
  let findTStudent = await Student.findOne({ email });
  if (!findTStudent) return next(new ApiError("Student dose not exist."));
  if (findTStudent?.password === password && findTStudent?.email === email) {
    return res.json(new ApiSuccess(findTStudent, "Login Successfully."));
  } else {
    return next(new ApiError("email or password incorrect."));
  }
});

module.exports = {
  loginTutor,
  loginStudent,
};
