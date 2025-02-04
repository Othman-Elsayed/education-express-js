const router = require("express")?.Router();
const controller = require("../controller/chatController");
// const validation = require("../validation/chatValidation");
router
  .route("/")
  .get(controller.getAll)
  .post(controller.create)
  .delete(controller.remove);
router.route("/:userId").get(controller.getById);

module.exports = router;
