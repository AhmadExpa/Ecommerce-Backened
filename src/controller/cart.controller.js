const cartService = require("../services/cart.service");
const findUserCart = async (req, res) => {
  const user = req.user;
  try {
    const cart = await cartService.findUserCart(user._id);
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const addItemToCart = async (req, res) => {
  const user = req.user;
  const { productId, size } = req.body;
  try {
    const cart = await cartService.addItemToCart(user._id, req.body);
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { findUserCart, addItemToCart };
