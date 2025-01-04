const router = require("express")?.Router();
const controller = require("../controller/studentController");
const validation = require("../validation/studentValidation");
router
  .route("/")
  .get(controller.getAllStudents)
  .post(validation.createValidator, controller.createStudent)
  .put(validation.updateValidator, controller.updateStudent);
router
  .route("/:studentId")
  .get(validation.singleValidator, controller.getSingleStudent)
  .delete(validation.deleteValidator, controller.deleteStudent);

module.exports = router;
