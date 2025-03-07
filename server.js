require("dotenv").config(); // Load environment variables at the top

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
const router = require("./routes/index");
const socketHandler = require("./socket");
const path = require("path");

// Connect to the database
dbConnect();

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS support
const io = new Server(server, {
  cors: {
    origin: corsOptions.origin || "*", // Ensure correct CORS settings
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api", router);

// Socket.IO connection handler
io.on("connection", (socket) => socketHandler(socket, io));

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalError);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown for unhandled errors
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}\n${err.stack}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}\n${err.stack}`);
  server.close(() => process.exit(1));
});
