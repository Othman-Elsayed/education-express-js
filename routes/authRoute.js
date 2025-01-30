const router = require("express")?.Router();
const controller = require("../controller/authController");
const validation = require("../validation/authValidation");
router.route("/loginTutor").post(validation.loginTutor, controller.loginTutor);
router
  .route("/loginStudent")
  .post(validation.loginStudent, controller.loginStudent);

module.exports = router;
