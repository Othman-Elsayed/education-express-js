const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db_connect");
const corsOptions = require("./config/corsOptions");
const globalError = require("./middlewares/errorMiddlewares");
const ApiError = require("./utils/apiError");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const router = require("./routes/index");
const socketHandler = require("./socket");

// Connect to the database
dbConnect();

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api", router);

// Socket.IO connection handler
io.on("connection", (socket) => socketHandler(socket, io));

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use(globalError);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
