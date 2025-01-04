const router = require("express")?.Router();
const controller = require("../controller/courseController");
const validation = require("../validation/courseValidation");
router
  .route("/")
  .get(controller.getAllCourses)
  .post(validation.createValidator, controller.createCourse)
  .put(validation.updateValidator, controller.updateCourse);
router
  .route("/:courseId")
  .get(validation.singleValidator, controller.getSingleCourse)
  .delete(validation.deleteValidator, controller.deleteCourse);

module.exports = router;
