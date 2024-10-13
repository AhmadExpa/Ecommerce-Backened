const express = require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller");
const authenticate = require("../middlewares/authenticate");

router.put("/:id", authenticate, cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.deleteCartItem);
module.exports = router;