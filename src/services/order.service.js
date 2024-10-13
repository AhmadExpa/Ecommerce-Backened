const cartService = require("./cart.service");
const Address = require("../models/address.model");
const { populate } = require("../models/cart.model");

async function createOrder(user, shippingAddress) {
  try {
    let address;
    if (shippingAddress._id) {
      let exitingAddress = await Address.findById(shippingAddress._id);
      address = exitingAddress;
    } else {
      address = new Address(shippingAddress);
      address.user = user._id;
      await address.save();

      user.addresses.push(address);
      await user.save();
    }
    const cart = await cartService.get_cart(user._id);
    if (!cart) {
      throw new Error("Cart Not Found");
    }
    const orderItems = [];
    for (let item of cart.cartItems) {
      const orderItem = new orderItems({
        price: item.price,
        discountedPrice: item.discountedPrice,
        quantity: item.quantity,
        product: item.product,
        size: item.size,
        userID: user._id,
      });
      const createdOrder = await orderItem.save();
      orderItems.push(createdOrder);
    }

    const createdOrder = new Order({
      user,
      orderItems,
      totalPrice: cart.totalPrice,
      discountedPrice: cart.discountedPrice,
      discountedPercent: cart.discountedPercent,
      shippingAddress: address,
    });
    const savedOrder = await createdOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function placedOrder(orderID) {
  try {
    const order = await findOrderById(orderID);
    if (!order) {
      throw new Error("Order Not Found");
    }
    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";
    await order.save();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function confirmedOrders(orderID) {
  try {
    const order = await findOrderById(orderID);
    if (!order) {
      throw new Error("Order Not Found");
    }
    order.orderStatus = "CONFIRMED";
    order.paymentDetails.status = "COMPLETED";
    await order.save();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function shippedOrders(orderID) {
  try {
    const order = await findOrderById(orderID);
    if (!order) {
      throw new Error("Order Not Found");
    }
    order.orderStatus = "SHIPPED";
    await order.save();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deliveredOrders(orderID) {
  try {
    const order = await findOrderById(orderID);
    if (!order) {
      throw new Error("Order Not Found");
    }
    order.orderStatus = "DELIVERED";
    await order.save();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function cancelledOrders(orderID) {
  try {
    const order = await findOrderById(orderID);
    if (!order) {
      throw new Error("Order Not Found");
    }
    order.orderStatus = "CANCELLED";
    await order.save();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findOrderById(orderID) {
  const order = await Order.findById(orderID)
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("user")
    .populate("shippingAddress");
  return order;
}
async function userOrderHistory(userID) {
  const orders = await Order.find({ user: userID, orderStatus: "PLACED" })
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("user")
    .populate("shippingAddress");
  return orders;
}
async function getAllOrders() {
  const orders = await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("user")
    .populate("shippingAddress");
  return orders;
}
async function deleteOrder(orderID) {
  const order = await findOrderById(orderID);
  if (!order) {
    throw new Error("Order Not Found");
  }
  await Order.findByIdAndDelete(orderID);
  return "Order Deleted";
}
module.exports = {
  createOrder,
  placedOrder,
  confirmedOrders,
  shippedOrders,
  deliveredOrders,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
  cancelledOrders,
};
