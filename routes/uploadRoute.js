const { upload } = require("../utils/upload");
const controller = require("../controller/uploadController");
const router = require("express")?.Router();
router.route("/").post(upload.single("file"), controller.uploadFile);

module.exports = router;
