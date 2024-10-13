const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middlewares/authenticate");

router.get("/", productController.getAllProducts);
router.get("/id/:id", productController.findProductByID);

module.exports = router;
