const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, orderController.getAllOrders);
router.get("/user", authenticate, orderController.userOrderHistory);
router.get("/:id", authenticate, orderController.findOrderByID);

module.exports = router;