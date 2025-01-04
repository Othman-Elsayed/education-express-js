const router = require("express")?.Router();
const usersController = require("../controller/userController");
const verifyToken = require("../middlewares/verifyToken");
const validation = require("../validation/userValidation");

router.use(verifyToken);
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(validation.createUserValidator, usersController.createUser)
  .put(validation.updateUserValidator, usersController.updateUser);
router
  .route("/:userId")
  .get(validation.singleUserValidator, usersController.getSingleUser)
  .delete(validation.deleteUserValidator, usersController.deleteUser);

module.exports = router;
