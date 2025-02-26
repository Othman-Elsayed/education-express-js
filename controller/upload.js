const ApiSuccess = require("../utils/apiSuccess");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/apiError");
const Upload = require("../modules/Upload");
const User = require("../modules/User");

const create = asyncHandler(async (req, res, next) => {
  const owner = req.query.userId;
  const findUser = await User.findById(owner);
  if (!findUser) return next(new ApiError("User id not found!"));
  const filePath = req.file.path?.toString()?.split("\\").pop();
  const url = Boolean(filePath) ? filePath : "url not avlibel";
  if (!url) return next(new ApiError("url not avlibel"));
  const upload = await Upload.create({
    fileName: url,
    owner,
  });
  return res.json(new ApiSuccess("Upload successfully", upload));
});
const remove = asyncHandler(async (req, res, next) => {
  const { owner, fileName } = req.body;
  const filePath = path.join(__dirname, "..", "uploads", fileName);
  if (!fs.existsSync(filePath)) {
    return next(new ApiError("File not found"));
  }
  const getOwner = await Upload.findOne({ fileName, owner });
  if (getOwner && getOwner.owner?.toString() === owner?.toString()) {
    await Upload.findByIdAndDelete(getOwner._id);
    await fs.unlinkSync(filePath);
    return res.json(new ApiSuccess("File deleted successfully"));
  }
  return next(new ApiError("Can't remove this file"));
});

module.exports = { create, remove };
