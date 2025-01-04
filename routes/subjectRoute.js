const router = require("express")?.Router();
const controller = require("../controller/subjectController");
const validation = require("../validation/subjectValidation");
router
  .route("/")
  .get(controller.getAllSubjects)
  .post(validation.createValidator, controller.createSubject)
  .put(validation.updateValidator, controller.updateSubject);
router
  .route("/:subjectId")
  .get(validation.singleValidator, controller.getSingleSubject)
  .delete(validation.deleteValidator, controller.deleteSubject);

module.exports = router;
