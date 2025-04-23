const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  const { user, products, totalAmount, paymentMethod, shippingAddress } = req.body;
  try {
    const order = new Order({ user, products, totalAmount, paymentMethod, shippingAddress });
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId }).populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};