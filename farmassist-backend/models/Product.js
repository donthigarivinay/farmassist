const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // Fertilizer, Seeds, Tools, etc.
  stock: { type: Number, required: true },
  image: { type: String }, // URL of the product image
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Dealer who added the product
});

module.exports = mongoose.model("Product", productSchema);