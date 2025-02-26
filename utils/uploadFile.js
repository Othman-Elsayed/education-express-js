const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cp) {
    cp(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cp) {
    cp(null, `${v4()}img${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage });
module.exports = uploadFile;
