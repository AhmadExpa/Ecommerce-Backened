const orderService = require("../services/order.service");
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const confirmedOrders = async (req, res) => {
  const orderID = req.params.orderID;
  try {
    const orders = await orderService.confirmedOrders(orderID);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const shippedOrders = async (req, res) => {
  const orderID = req.params.orderID;

  try {
    const orders = await orderService.shippedOrders(orderID);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const cancelledOrders = async (req, res) => {
    const orderID = req.params.orderID;
  
    try {
      const orders = await orderService.cancelledOrders(orderID);
      res.status(200).json({ orders });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
const deliveredOrders = async (req, res) => {
  const orderID = req.params.orderID; 
  try {
    const orders = await orderService.deliveredOrders(orderID);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteOrder = async (req, res) => {   
  const orderID = req.params.orderID;
  try {
    const orders = await orderService.deleteOrder(orderID);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getAllOrders,
  confirmedOrders,
  shippedOrders,
  cancelledOrders,
  deliveredOrders,
  deleteOrder,
};