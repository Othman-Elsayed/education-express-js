const router = require("express")?.Router();
const controller = require("../controller/authController");
const validation = require("../validation/authValidation");
router.route("/tutor").post(validation.loginTutor, controller.loginTutor);
router.route("/student").post(validation.loginStudent, controller.loginStudent);

module.exports = router;
