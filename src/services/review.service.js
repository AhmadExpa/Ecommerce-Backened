const Review = require("../models/review.model");
const productService = require("./product.service");
async function createReview(reqData, user) {
  const product = await productService.getProductByID(reqData.productID);
  const review = new Review({
    user: user._id,
    product: product._id,
    review: reqData.review,
    createdAt: new Date(),
  });
  await product.reviews.push(review);
  await product.save();
  const createdReview = await review.save();
  return createdReview;
}
async function getAllReviews(productID) {
  const product = await productService.getProductByID(productID);
  if (!product) {
    throw new Error("Product Not Found");
  }
  return await Review.find({ product: product._id }).populate("user");
}
module.exports = {
  createReview,
  getAllReviews,
};