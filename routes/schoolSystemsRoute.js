const router = require("express")?.Router();
const controller = require("../controller/schoolSystemsController");
const validation = require("../validation/schoolSystemsValidation");
router
  .route("/")
  .get(controller.getAll)
  .post(validation.create, controller.create)
  .put(validation.update, controller.update)
  .delete(validation.remove, controller.remove);
router.route("/:id").get(validation.byId, controller.byId);

module.exports = router;
