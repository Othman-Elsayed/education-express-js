const router = require("express")?.Router();
const controller = require("../controller/lectureRequestController");
// const validation = require("../validation/scheduleValidation");
router
  .route("/")
  .get(controller.getByTutor)
  .get(controller.getByStudent)
  .post(controller.create)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;
