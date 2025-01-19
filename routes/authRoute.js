const router = require("express")?.Router();
const controller = require("../controller/authController");
const validation = require("../validation/authValidation");

router.route("/register").post(validation.register, controller.register);
router.route("/login").post(validation.login, controller.login);
router.route("/refresh").get(controller.refreshToken);

module.exports = router;
