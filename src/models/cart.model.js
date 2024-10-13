const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  cartItems: [
    { type: mongoose.Schema.Types.ObjectId, ref: "cartItems", required: true },
  ],
  totalItems: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
  discountedPrice: { type: Number, required: true, default: 0 },
  discountedPercent: { type: Number, required: true, default: 0 },
});
const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
