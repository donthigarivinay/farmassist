const Product = require("../models/Product");

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, category, stock, image, dealer } = req.body;
  try {
    const product = new Product({ name, description, price, category, stock, image, dealer });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("dealer", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};