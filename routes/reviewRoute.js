const router = require("express")?.Router();
const controller = require("../controller/reviewController");
const validation = require("../validation/reviewValidation");
router
  .route("/")
  .get(controller.getAllReviews)
  .post(validation.createValidator, controller.createReview)
  .put(validation.updateValidator, controller.updateReview);
router
  .route("/:reviewId")
  .get(validation.singleValidator, controller.getSingleReview)
  .delete(validation.deleteValidator, controller.deleteReview);

module.exports = router;
