const ratingService = require("../services/rating.service");
const createRating = async (req, res) => {
  const user = req.user;
  try {
    const rating = await ratingService.createRating(req.body, user);
    res.status(200).json({ rating });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllRatings = async (req, res) => {
  const productID = req.params.productID;
  try {
    const ratings = await ratingService.getAllRatings(productID);
    res.status(200).json({ ratings });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createRating, getAllRatings };
