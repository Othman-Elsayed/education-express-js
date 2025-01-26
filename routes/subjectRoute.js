const router = require("express")?.Router();
const controller = require("../controller/subjectController");
const validation = require("../validation/subjectValidation");
router
  .route("/")
  .get(controller.getAll)
  .post(validation.create, controller.create)
  .put(validation.update, controller.update)
  .delete(validation.remove, controller.remove);
router.route("/:id").get(validation.byId, controller.getById);

module.exports = router;
