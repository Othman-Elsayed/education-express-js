// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db_connect");
const corsOptions = require("./config/corsOptions");
const handleSwagger = require("./config/swagger");
const globalError = require("./middlewares/errorMiddlewares");
const ApiError = require("./utils/apiError");
const multer = require("multer");
const path = require("path");
const paypal = require("paypal-rest-sdk");

// Routes
const tutorRoute = require("./routes/tutorRoute");
const studentRoute = require("./routes/studentRoute");
const subjectRoute = require("./routes/subjectRoute");
const schoolSystemsRoute = require("./routes/schoolSystemsRoute");
const levelsGradeRoute = require("./routes/levelsGradeRoute");
const chatRoute = require("./routes/chatRoute");
const authRoute = require("./routes/authRoute");
const lectureRoute = require("./routes/lectureRoute");
const lectureRequestRoute = require("./routes/lectureRequestRoute");

require("dotenv").config();

const app = express();

// Database connection
dbConnect();

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Math.random()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Swagger documentation
handleSwagger(app);

// Routes
app.use("/api/tutor", tutorRoute);
app.use("/api/student", studentRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/schoolSystems", schoolSystemsRoute);
app.use("/api/levelsGrade", levelsGradeRoute);
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/lecture", lectureRoute);
app.use("/api/lectureRequest", lectureRequestRoute);

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  res.status(200).send({
    message: "File uploaded successfully",
    file: req.file,
  });
});

// File download route
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

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handler
app.use(globalError);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
