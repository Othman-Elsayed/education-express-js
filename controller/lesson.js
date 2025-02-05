const asyncHandler = require("express-async-handler");
const Lessons = require("../modules/Lessons");
const ApiSuccess = require("../utils/apiSuccess");

const getAll = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const lessons = await Lessons.find({
    $or: [{ teacher: userId }, { studentsRequests: userId }],
  })
    .populate("teacher subject", "name")
    .select("-__v");
  return res.json(new ApiSuccess("Fetch lessons successfully.", lessons));
});

const accept = asyncHandler(async () => {
  const lesson = await Lessons.findByIdAndUpdate(
    req.query.id,
    { status: "accepted" },
    {
      new: true,
    }
  );
  lesson.__v = undefined;
  return res.json(new ApiSuccess("Accepted lesson successfully", lesson));
});

const reject = asyncHandler(async () => {
  const lesson = await Lessons.findByIdAndUpdate(
    req.query.id,
    { status: "rejected" },
    {
      new: true,
    }
  );
  lesson.__v = undefined;
  return res.json(new ApiSuccess("Rejected lesson successfully", lesson));
});

const create = asyncHandler(async (req, res) => {
  const { teacher, price, subject, day, startTime, endTime, isGroup } =
    req.body;
  let payload = {
    teacher,
    price,
    subject,
    day,
    startTime,
    endTime,
  };
  if (req.user.role === "teacher" && +req.user.evaluation >= 5) {
    payload.isGroup = isGroup;
  }
  const lesson = await Lessons.create(payload);
  lesson.__v = undefined;
  return res.json(new ApiSuccess("Created lesson successfully", lesson));
});

const update = asyncHandler(async (req, res) => {
  const { id, teacher, price, subject, day, startTime, endTime, isGroup } =
    req.body;
  let payload = {
    teacher,
    price,
    subject,
    day,
    startTime,
    endTime,
  };
  if (req.user.role === "teacher" && +req.user.evaluation >= 5) {
    payload.isGroup = isGroup;
  }
  const lesson = await Lessons.findByIdAndUpdate(id, payload, {
    new: true,
  });
  lesson.__v = undefined;
  return res.json(new ApiSuccess("Updated lesson successfully", lesson));
});

const remove = asyncHandler(async (req, res) => {
  await Lessons.findByIdAndDelete(req.query.id);
  return res.json(new ApiSuccess("Deleted lesson successfully"));
});

module.exports = {
  getAll,
  create,
  update,
  remove,
  accept,
  reject,
};
