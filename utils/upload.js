const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }${path.extname(file.originalname)}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
// const multer = require("multer");
// const crypto = require("crypto");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const path = require("path");
// require("dotenv")?.config();

// // Storage
// const storage = new GridFsStorage({
//   url: process.env.DB_URI,
//   cache: true,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           console.log("rrr");
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const upload = multer({ storage });

// module.exports = { upload };
