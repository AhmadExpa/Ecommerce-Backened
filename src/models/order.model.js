const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  orderItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderItems",
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
  },
  paymentDetails: {
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
});
const Order = mongoose.model("orders", orderSchema);
module.exports = Order;