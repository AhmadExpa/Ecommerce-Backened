const express = require("express");
const router = express.Router();

const adminOrderController = require("../controller/adminOrder.controller");
const authenticate = require("../middlewares/authenticate");
router.get("/", authenticate, adminOrderController.getAllOrders);
router.put(
  "/:orderID/confirmed",
  authenticate,
  adminOrderController.confirmedOrders
);
router.put(
  "/:orderID/shipped",
  authenticate,
  adminOrderController.shippedOrders
);
router.put(
  "/:orderID/delivered",
  authenticate,
  adminOrderController.deliveredOrders
);
router.put(
  "/:orderID/cancelled",
  authenticate,
  adminOrderController.cancelledOrders
);
router.delete(
  "/:orderID/delete",
  authenticate,
  adminOrderController.deleteOrder
);
module.exports = router;
