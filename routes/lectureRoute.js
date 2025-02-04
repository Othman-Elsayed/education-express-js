const router = require("express")?.Router();
const controller = require("../controller/lectureController");
// const validation = require("../validation/scheduleValidation");
router
  .route("/")
  .get(controller.getByTutor)
  .post(controller.create)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;
