const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db_connect");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlewares");
const corsOptions = require("./config/corsOptions");
const tutorRoute = require("./routes/tutorRoute");
const studentRoute = require("./routes/studentRoute");
const subjectRoute = require("./routes/subjectRoute");
const authRoute = require("./routes/authRoute");
const schoolSystemsRoute = require("./routes/schoolSystemsRoute");
const levelsGradeRoute = require("./routes/levelsGradeRoute");
const handleSwagger = require("./config/swagger");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Math.random()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

require("dotenv")?.config();
const app = express();
dbConnect();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`success server running on port ${process.env.PORT || "8000"}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log("error connection db ->", err);
});

handleSwagger(app);
app.use(`/api/tutor`, tutorRoute);
app.use(`/api/student`, studentRoute);
app.use(`/api/subject`, subjectRoute);
app.use(`/api/schoolSystems`, schoolSystemsRoute);
app.use(`/api/levelsGrade`, levelsGradeRoute);
app.use(`/api/auth`, authRoute);
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  res.status(200).send({
    message: "File uploaded successfully",
    file: req.file,
  });
});
app.get("/api/upload/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  console.log(filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send({ message: "Image not found" });
    }
  });
});
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
// const User = require("./modules/SchoolSystemsSchema");
// User.syncIndexes();
app.use(globalError);
