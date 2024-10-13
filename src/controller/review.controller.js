const reviewService = require("../services/review.service");
const createReview = async (req, res) => {
  const user = req.user;
  try {
    const review = await reviewService.createReview(req.body, user);
    res.status(200).json({ review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  const productID = req.params.productID;
  try {
    const reviews = await reviewService.getAllReviews(productID);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createReview, getAllReviews };
