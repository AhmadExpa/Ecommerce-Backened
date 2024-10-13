const express = require("express");
const router = express.Router();

const cartController = require("../controller/cart.controller");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, cartController.getCart);
router.put("/add", authenticate, cartController.addToCart);
module.exports = router;
