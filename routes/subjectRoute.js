const router = require("express")?.Router();
const controller = require("../controller/subjectController");
const upload = require("../middlewares/uplode");
const validation = require("../validation/subjectValidation");
router
  .route("/")
  .get(controller.getAllSubjects)
  .post(
    validation.createValidator,
    upload.single("avatar"),
    controller.createSubject
  )
  .put(
    validation.updateValidator,
    upload.single("avatar"),
    controller.updateSubject
  );
router
  .route("/:subjectId")
  .get(validation.singleValidator, controller.getSingleSubject)
  .delete(validation.deleteValidator, controller.deleteSubject);

module.exports = router;
