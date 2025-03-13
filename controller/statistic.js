const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../utils/apiSuccess");
const Statistics = require("../modules/Statistics");
const Booking = require("../modules/Booking");
const User = require("../modules/User");

const getStatistic = asyncHandler(async (req, res, next) => {
  const statistics = await Statistics.find().populate({
    path: "teacher",
    select: "img name",
    populate: {
      path: "img",
      select: "fileName -_id",
    },
  });
  return res.json(new ApiSuccess("Fetch all statistics", statistics));
});
const getTotals = asyncHandler(async (req, res, next) => {
  // const sessions = await Booking.countDocuments({ status: "accepted" });
  // const teachers = await User.countDocuments({ role: "teacher" });
  // const students = await User.countDocuments({ role: "student" });
  const teachers = await Statistics.countDocuments();
  const prices = await Statistics.aggregate([
    {
      $group: {
        _id: null,
        totalTeacherPrice: { $sum: "$teacherPrice" },
        totalStudentPrice: { $sum: "$studentPrice" },
        totalPlatformPrice: { $sum: "$platformPrice" },
        students: { $sum: { $size: "$students" } },
        sessions: { $sum: { $size: "$sessions" } },
      },
    },
  ]);
  const pricesH = prices[0] || {};
  let totals = {
    teachers,
    sessions: pricesH?.sessions,
    students: pricesH?.students,
    totalTeacherPrice: pricesH?.totalTeacherPrice,
    totalStudentPrice: pricesH?.totalStudentPrice,
    totalPlatformPrice: pricesH?.totalPlatformPrice,
    totals:
      pricesH?.totalPlatformPrice +
      pricesH?.totalStudentPrice +
      pricesH?.totalTeacherPrice,
  };

  return res.json(new ApiSuccess("Fetch all totals", totals));
});

module.exports = {
  getTotals,
  getStatistic,
};
