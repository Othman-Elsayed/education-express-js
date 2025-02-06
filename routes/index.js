const express = require("express");
const router = express.Router();

const { verifyToken, verifyRole } = require("../middlewares/verifyToken");

const authController = require("../controller/auth");
const userController = require("../controller/user");
const priceController = require("../controller/price");
const lessonController = require("../controller/lesson");
const subjectController = require("../controller/subject");
const bookingController = require("../controller/booking");
const educationSystemController = require("../controller/educationSystem");

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);

// Users
router.get(
  "/user/students",
  verifyToken,
  verifyRole(["admin"]),
  userController.getStudents
);
router.get("/user/teachers", userController.getTeachers);
router.get("/user/findById", userController.getById);

// Subject
router.get("/subjects", subjectController.getAll);
router.post(
  "/subject",
  verifyToken,
  verifyRole(["admin"]),
  subjectController.create
);
router.put(
  "/subject",
  verifyToken,
  verifyRole(["admin"]),
  subjectController.update
);
router.delete(
  "/subject",
  verifyToken,
  verifyRole(["admin"]),
  subjectController.remove
);

// Education System
router.get("/educationSystem", educationSystemController.getAll);
router.post(
  "/educationSystem",
  verifyToken,
  verifyRole(["admin"]),
  educationSystemController.create
);
router.put(
  "/educationSystem",
  verifyToken,
  verifyRole(["admin"]),
  educationSystemController.update
);
router.delete(
  "/educationSystem",
  verifyToken,
  verifyRole(["admin"]),
  educationSystemController.remove
);

// price
router.get("/price", priceController.getAll);
router.post(
  "/price",
  verifyToken,
  verifyRole(["admin"]),
  priceController.create
);
router.put(
  "/price",
  verifyToken,
  verifyRole(["admin"]),
  priceController.update
);
router.delete(
  "/price",
  verifyToken,
  verifyRole(["admin"]),
  priceController.remove
);

// Lesson
router.get("/lesson", lessonController.getAll);
router.post(
  "/lesson",
  verifyToken,
  verifyRole(["admin", "teacher"]),
  lessonController.create
);
router.put(
  "/lesson",
  verifyToken,
  verifyRole(["admin", "teacher"]),
  lessonController.update
);
router.delete(
  "/lesson",
  verifyToken,
  verifyRole(["admin", "teacher"]),
  lessonController.remove
);

// Booking
router.get("/booking", verifyToken, bookingController.getBooking);
router.post("/booking/send", verifyToken, bookingController.sendBooking);
router.post(
  "/booking/accept",
  verifyToken,
  verifyRole(["admin"]),
  bookingController.acceptedBooking
);
router.post(
  "/booking/reject",
  verifyToken,
  verifyRole(["admin"]),
  bookingController.rejectBooking
);

module.exports = router;
