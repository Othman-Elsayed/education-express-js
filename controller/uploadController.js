const asyncHandler = require("express-async-handler");

// Assuming storage is configured and passed correctly here, replace 'storage' with your actual configuration if necessary.
const uploadFile = asyncHandler(async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  res.json({
    file: file.originalname,
    path: file.path,
  });
});

module.exports = { uploadFile };
