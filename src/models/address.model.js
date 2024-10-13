const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  contact: {
    type: String,
    required: true,
  },
});
const Address = mongoose.model("addresses", addressSchema);
module.exports = Address;
