const cartItemService = require("../services/cartItem.service");
const updateCartItem = async (req, res) => {
  const user = req.user;
  try {
    const updatedCartItem = await cartItemService.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );
    res.status(200).json({ updatedCartItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const removeCartItem = async (req, res) => {
  const user = req.user;
  try {
    const removedCartItem = await cartItemService.removeCartItem(
      user._id,
      req.params.id
    );
    res.status(200).json({ removedCartItem, message: "Cart Item Removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
};
 