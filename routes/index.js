const express = require("express");
const router = express.Router();

const { verifyToken, verifyRole } = require("../middlewares/verifyToken");

const authController = require("../controller/auth");
const userController = require("../controller/user");
const levelController = require("../controller/level");
const priceController = require("../controller/price");
const lessonController = require("../controller/lesson");
const subjectController = require("../controller/subject");
const educationSystemController = require("../controller/educationSystem");

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);

// Users
router.get("/user/teachers", userController.getTeachers);
router.get("/user/byId", userController.getById);

// Subject
router.get("/subject", subjectController.getAll);
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

// Level
router.get("/level", levelController.getAll);
router.post(
  "/level",
  verifyToken,
  verifyRole(["admin"]),
  levelController.create
);
router.put(
  "/level",
  verifyToken,
  verifyRole(["admin"]),
  levelController.update
);
router.delete(
  "/level",
  verifyToken,
  verifyRole(["admin"]),
  levelController.remove
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
router.post(
  "/lesson/accept",
  verifyToken,
  verifyRole(["admin"]),
  lessonController.getAll
);
router.post(
  "/lesson/reject",
  verifyToken,
  verifyRole(["admin"]),
  lessonController.getAll
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
module.exports = router;
