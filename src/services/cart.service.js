const Cart = require("../models/cart.model");
async function create_cart(user) {
  try {
    const cart = new Cart({
      user: user._id,
    });
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function get_cart(user) {
  try {
    const cart = await Cart.findOne({ user: user._id });
    let cartItems = await Cart.find({ _id: cart._id }).populate("product");
    if (!cart) {
      throw new Error("Cart Not Found");
    }
    cart.cartItems = cartItems;
    let totalItems = 0;
    let totalPrice = 0;
    let discountedPrice = 0;
    let discountedPercent = 0;
    for (let item of cart.cartItems) {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
      discountedPrice += item.discountedPrice * item.quantity;
      discountedPercent += item.discountedPercent;
    }
    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
    cart.discountedPrice = discountedPrice;
    cart.discountedPercent = discountedPercent;
    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function delete_cart(user) {
  try {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      throw new Error("Cart Not Found Register First");
    }
    await cart.remove();
    return "Cart Deleted";
  } catch (error) {
    throw new Error(error.message);
  }
}
async function add_to_cart(user, product, size, quantity) {
  try {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      throw new Error("Cart Not Found Register First");
    }
    const product = await Product.findById(req.productId);
    if (!product) {
      throw new Error("Product Not Found");
    }
    const isPresent = await Cart.findOne({
      cart: cart._id,
      product: product._id,
      user: user._id,
    });
    if (!isPresent) {
      const cartItem = {
        cart: cart._id,
        product: product._id,
        size: req.size,
        quantity: 1,
        price: product.price,
        discountedPrice: product.discountedPrice,
        discountedPercent: product.discountedPercent,
        userID: user._id,
      };
    }
    const createdCartItem = await cartItem.save();
    cart.cartItems.push(createdCart);
    await cart.save();
    return "Added To Cart";
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  create_cart,
  get_cart,
  delete_cart,
  add_to_cart,
};
