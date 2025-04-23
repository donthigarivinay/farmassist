const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, updateOrderStatus } = require("../controllers/orderController");

// Order routes
router.post("/orders", createOrder); // POST /api/orders
router.get("/orders/:userId", getUserOrders); // GET /api/orders/:userId
router.put("/orders/:id", updateOrderStatus); // PUT /api/orders/:id

module.exports = router;