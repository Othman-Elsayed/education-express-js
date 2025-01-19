const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db_connect");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlewares");
const corsOptions = require("./config/corsOptions");
const usersRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");
const tutorRoute = require("./routes/tutorRoute");
const studentRoute = require("./routes/studentRoute");
const subjectRoute = require("./routes/subjectRoute");
const reviewRoute = require("./routes/reviewRoute");
const schoolSystemsRoute = require("./routes/schoolSystemsRoute");
const handleSwagger = require("./config/swagger");

require("dotenv")?.config();
const app = express();
dbConnect();

app.use(cors(corsOptions));
app.use(cookieParser());
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

app.use(`/api/users`, usersRoute);
app.use(`/api/auth`, authRoute);
app.use(`/api/tutor`, tutorRoute);
app.use(`/api/student`, studentRoute);
app.use(`/api/subject`, subjectRoute);
app.use(`/api/review`, reviewRoute);
app.use(`/api/schoolSystems`, schoolSystemsRoute);
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
// const User = require("./modules/UserSchema");
// User.syncIndexes();
app.use(globalError);
