const orderService = require("../services/order.service");
const createOrder = async (req, res) => {
  const user = req.user;
  try {
    let createdOrder = await orderService.createOrder(user, req.body);
    res.status(200).json({ createdOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const findOrderByID = async (req, res) => {
  const user = req.user;
  try {
    let order = await orderService.findOrderById(req.params.id);
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const orderHistory = async (req, res) => {
  const user = req.user;
  try {
    let order = await orderService.userOrderHistory(req.params.id);
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, findOrderByID, orderHistory };
