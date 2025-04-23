const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Dealer who owns the store
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Products available in the store
});

storeSchema.index({ location: "2dsphere" }); // Enable geospatial queries

module.exports = mongoose.model("Store", storeSchema);