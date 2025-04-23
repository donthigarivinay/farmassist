const express = require("express");
const router = express.Router();
const { addProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");

// Product routes
router.post("/products", addProduct);
router.get("/products", getProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;