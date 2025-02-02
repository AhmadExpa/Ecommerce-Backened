const express = require("express");
const router = express.Router();

const reviewController = require("../controller/review.controller");
const authenticate = require("../middlewares/authenticate");
router.post("/create", authenticate, reviewController.createReview);
router.get("/product/:productID", reviewController.getAllReviews);

module.exports = router;