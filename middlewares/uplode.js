const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  diskStorage: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      callback(null, true);
    } else {
      console.log("only png & jpg file supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
