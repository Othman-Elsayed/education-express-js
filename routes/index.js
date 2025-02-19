const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");
const authValidation = require("../validation/auth");

const userController = require("../controller/user");
const userValidation = require("../validation/user");

const priceController = require("../controller/price");
const priceValidation = require("../validation/price");

const lessonController = require("../controller/lesson");
const lessonValidation = require("../validation/lesson");

const subjectController = require("../controller/subject");
const subjectValidation = require("../validation/subject");

const bookingController = require("../controller/booking");
const bookingValidation = require("../validation/booking");

const levelController = require("../controller/level");
const levelValidation = require("../validation/level");

const educationSystemController = require("../controller/educationSystem");
const educationValidation = require("../validation/educationSystem");

const messageController = require("../controller/message");
const messageValidation = require("../validation/message");

const chatController = require("../controller/chat");
const chatValidation = require("../validation/chat");

const { verifyToken, verifyRole } = require("../middlewares/verifyToken");

// Auth
router.post("/register", authValidation.register, authController.register);
router.post("/login", authValidation.login, authController.login);
router.post("/logout", authController.logout);

// Users
router.get(
  "/users/students",
  verifyToken,
  verifyRole(["admin"]),
  userController.getStudents
);
router.get("/users/teachers", userController.getTeachers);
router.get("/user", userValidation.byId, userController.getById);
router.put(
  "/user",
  userValidation.update,
  verifyToken,
  userController.updateProfile
);

// Chat
router.get("/chats", verifyToken, chatController.getAll);
router.post("/chat", verifyToken, chatValidation.byId, chatController.byId);
router.post("/chat", verifyToken, chatValidation.create, chatController.create);
router.put("/chat", verifyToken, chatValidation.update, chatController.update);
router.delete(
  "/chat",
  verifyToken,
  chatValidation.remove,
  chatController.remove
);

// Message
router.get(
  "/messages",
  verifyToken,
  messageValidation.getAll,
  messageController.getAll
);
router.post(
  "/message",
  verifyToken,
  messageValidation.create,
  messageController.create
);
router.put(
  "/message",
  verifyToken,
  messageValidation.update,
  messageController.update
);
router.put(
  "/messages",
  verifyToken,
  messageValidation.updateToRead,
  messageController.updateToRead
);
router.delete(
  "/message",
  verifyToken,
  messageValidation.remove,
  messageController.remove
);

// Subject
router.get("/subjects", subjectController.getAll);
router.post(
  "/subject",
  subjectValidation.create,
  verifyToken,
  verifyRole(["admin"]),
  subjectController.create
);
router.put(
  "/subject",
  subjectValidation.update,
  verifyToken,
  verifyRole(["admin"]),
  subjectController.update
);
router.delete(
  "/subject",
  subjectValidation.remove,
  verifyToken,
  verifyRole(["admin"]),
  subjectController.remove
);

// Level
router.get("/levels", levelController.getAll);
router.post(
  "/level",
  levelValidation.create,
  verifyToken,
  verifyRole(["admin"]),
  levelController.create
);
router.put(
  "/level",
  levelValidation.update,
  verifyToken,
  verifyRole(["admin"]),
  levelController.update
);
router.delete(
  "/level",
  levelValidation.remove,
  verifyToken,
  verifyRole(["admin"]),
  levelController.remove
);

// Education System
router.get("/educationSystems", educationSystemController.getAll);
router.post(
  "/educationSystem",
  educationValidation.create,
  verifyToken,
  verifyRole(["admin"]),
  educationSystemController.create
);
router.put(
  "/educationSystem",
  educationValidation.update,
  verifyToken,
  verifyRole(["admin"]),
  educationSystemController.update
);
router.delete(
  "/educationSystem",
  educationValidation.remove,
  verifyToken,
  verifyRole(["admin"]),
  educationSystemController.remove
);

// price
router.get("/prices", priceController.getAll);
router.get("/price", priceValidation.getById, priceController.getById);
router.post(
  "/price",
  priceValidation.create,
  verifyToken,
  verifyRole(["admin"]),
  priceController.create
);
router.put(
  "/price",
  priceValidation.update,
  verifyToken,
  verifyRole(["admin"]),
  priceController.update
);
router.delete(
  "/price",
  priceValidation.remove,
  verifyToken,
  verifyRole(["admin"]),
  priceController.remove
);

// Lesson
router.get("/lessons", lessonController.getAll);
router.get("/lesson", lessonValidation.byId, lessonController.getById);
router.post(
  "/lesson",
  lessonValidation.create,
  verifyToken,
  verifyRole(["admin", "teacher"]),
  lessonController.create
);
router.post(
  "/lesson/finished",
  lessonValidation.finished,
  verifyToken,
  lessonController.finishedLesson
);
router.put(
  "/lesson",
  lessonValidation.update,
  verifyToken,
  verifyRole(["admin", "teacher"]),
  lessonController.update
);
router.delete(
  "/lesson",
  lessonValidation.remove,
  verifyToken,
  verifyRole(["admin", "teacher"]),
  lessonController.remove
);

// Booking
router.get("/bookings", verifyToken, bookingController.getBooking);
router.post(
  "/booking/send",
  bookingValidation.send,
  verifyToken,
  bookingController.sendBooking
);
router.post(
  "/booking/accept",
  bookingValidation.accepted,
  verifyToken,
  verifyRole(["admin"]),
  bookingController.acceptedBooking
);
router.post(
  "/booking/reject",
  bookingValidation.reject,
  verifyToken,
  verifyRole(["admin"]),
  bookingController.rejectBooking
);
router.delete("/booking", verifyToken, bookingController.remove);
module.exports = router;
