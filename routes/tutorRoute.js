const router = require("express")?.Router();
const controller = require("../controller/tutorController");
const validation = require("../validation/tutorValidation");
router
  .route("/")
  .get(controller.getAllTutor)
  .post(validation.createValidator, controller.createTutor)
  .put(validation.updateValidator, controller.updateTutor);
router
  .route("/:userId")
  .get(validation.singleValidator, controller.getSingleTutor)
  .delete(validation.deleteValidator, controller.deleteTutor);
router.route("/:tutorId/subjects").get(controller.getTutorSubjects);

module.exports = router;
