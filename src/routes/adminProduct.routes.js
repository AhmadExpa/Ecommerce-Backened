const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleProducts);
router.delete("/:productID", authenticate, productController.deleteProduct);
router.put("/:productID", authenticate, productController.updateProduct);
module.exports = router;
