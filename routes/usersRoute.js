const router = require("express")?.Router();
const usersController = require("../controller/userController");
const validation = require("../validation/userValidation");
router.route("/").get(usersController.getAll);
router
  .route("/:id")
  .get(validation.byId, usersController.byId)
  .delete(validation.remove, usersController.remove);

module.exports = router;
