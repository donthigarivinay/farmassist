const express = require("express");
const router = express.Router();
const { addStore, getStores, findNearestStores } = require("../controllers/storeController");

// Middleware for logging requests (optional but helpful for debugging)
router.use((req, res, next) => {
  console.log(`[STORE ROUTE] ${req.method} ${req.originalUrl}`);
  next();
});

// Store routes
router.post("/stores", addStore); // POST /api/stores
router.get("/stores", getStores); // GET /api/stores
router.get("/stores/nearest", findNearestStores); // GET /api/stores/nearest

// Fallback for undefined store routes
router.use((req, res) => {
  console.warn(`[404] Store route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: "error",
    message: "Store route not found",
  });
});

module.exports = router;