const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db_connect");
const corsOptions = require("./config/corsOptions");
const globalError = require("./middlewares/errorMiddlewares");
const ApiError = require("./utils/apiError");
require("dotenv").config();
const router = require("./routes/index");
dbConnect();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
app.use(globalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
