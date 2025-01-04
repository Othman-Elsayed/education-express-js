const Review = require("../modules/ReviewSchema");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
} = require("../helper");

const getAllReviews = dataOne({ Schema: Review });
const createReview = createOne({ Schema: Review });
const updateReview = updateOne({ Schema: Review });
const deleteReview = deleteOne({ Schema: Review, nameIdParam: "reviewId" });
const getSingleReview = singleOne({ Schema: Review, nameIdParam: "reviewId" });

const controllers = {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};

module.exports = controllers;
