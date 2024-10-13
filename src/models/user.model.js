const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  contact: {
    type: String,
  },
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: "addresses" }],
  paymentInfo: [
    { type: mongoose.Schema.Types.ObjectId, ref: "paymentInformations" },
  ],
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "carts" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const User = mongoose.model("users", userSchema);
module.exports = User;
