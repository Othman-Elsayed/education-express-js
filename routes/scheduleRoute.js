const router = require("express")?.Router();
const controller = require("../controller/scheduleController");
const validation = require("../validation/scheduleValidation");
router
  .route("/")
  .get(controller.getAll)
  .post(controller.create)
  .put(controller.update)
  .delete(controller.remove);
router.route("/:id").get(controller.getById);

module.exports = router;
