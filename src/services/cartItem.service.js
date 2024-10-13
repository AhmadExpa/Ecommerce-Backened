const userService = require("../services/user.service");
const cartService = require("../services/cart.service");
const CartItem = require("../models/cartItem.model");

async function updateCartItem(cartItemID, userID, cartItemData) {
  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(cartItemID);
    if (!updatedCartItem) {
      throw new Error("Cart Item Not Found");
    }
    const user = await userService.getUserById(userID);
    if (!user) {
      throw new Error("User Not Found");
    }
    const cart = await cartService.get_cart(user);
    if (!cart) {
      throw new Error("Cart Not Found");
    }
    if (user._id.toString() === userID.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = cartItemData.price * item.quantity;
      item.discountedPrice = cartItemData.discountedPrice * item.quantity;

      const updateCartItem = await updatedCartItem.save();
      return updateCartItem;
    } else {
      throw new Error("you cant update this item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteCartItem(cartItemID, userID) {
  try {
    const user = await userService.getUserById(userID);
    if (!user) {
      throw new Error("User Not Found");
    }
    if (user._id.toString() === userID.toString()) {
      const deletedCartItem = await CartItem.findByIdAndDelete(cartItemID);
      if (!deletedCartItem) {
        throw new Error("Cart Item Not Found");
      }
    } else {
      throw new Error("you cant delete this item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findCartItemByID(cartItemID) {
  try {
    const cartItem = await CartItem.findById(cartItemID);
    if (!cartItem) {
      throw new Error("Cart Item Not Found");
    }
    return cartItem;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  updateCartItem,
  deleteCartItem,
  findCartItemByID,
};
