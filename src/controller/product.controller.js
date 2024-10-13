const productService = require("../services/product.service");
const createProduct = async (req, res) => {
  try {
    const createdProduct = await productService.createProduct(req.body);
    res.status(200).json({ createdProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const productID = req.params.productID;
  try {
    const deletedProduct = await productService.deleteProduct(productID);
    res.status(200).json({ deletedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productID = req.params.productID;
  try {
    const updatedProduct = await productService.updateProduct(
      productID,
      req.body
    );
    res.status(200).json({ updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findProductByID = async (req, res) => {
  const productID = req.params.productID;
  try {
    const product = await productService.findProductById(productID);
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createMultipleProducts = async (req, res) => {
  try {
    const createdProducts = await productService.createMultipleProducts(
      req.body
    );
    res
      .status(200)
      .json({ createdProducts, message: "Products created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductByID,
  getAllProducts,
  createMultipleProducts,
};
