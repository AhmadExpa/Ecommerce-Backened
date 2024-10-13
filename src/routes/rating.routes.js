const express = require("express");
const router = express.Router();

const ratingController = require("../controller/rating.controller");
const authenticate = require("../middlewares/authenticate");

router.post("/create", authenticate, ratingController.createRating);
router.get("/product/:productID", ratingController.getAllRatings);
module.exports = router;