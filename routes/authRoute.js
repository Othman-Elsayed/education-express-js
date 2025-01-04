const router = require("express")?.Router();
const controller = require("../controller/authController");
const validation = require("../validation/userValidation");

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/refresh").get(controller.refreshToken);

module.exports = router;
