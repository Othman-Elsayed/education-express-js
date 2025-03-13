const ApiSuccess = require("../utils/apiSuccess");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/apiError");
const Upload = require("../modules/Upload");
const User = require("../modules/User");
const cloudinary = require("cloudinary").v2;

const create = asyncHandler(async (req, res, next) => {
  const owner = req.user._id;
  const file = req.file;
  const { publicId, updateAvatar } = req.query;

  if (!file) return next(new ApiError("Upload failed, no file received."));

  const result = {
    public_id: file.filename,
    url: file.path,
  };

  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }

  console.log(publicId);

  if (updateAvatar) {
    let x = await User.findByIdAndUpdate(
      owner,
      {
        img: result,
      },
      { new: true }
    );
  }

  return res.json(new ApiSuccess("Upload successful", result));
});

module.exports = { create };

const remove = asyncHandler(async (req, res, next) => {
  const owner = req.user._id;
  const { public_id } = req.query;
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
