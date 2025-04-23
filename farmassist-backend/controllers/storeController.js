const Store = require("../models/Store");

// Add a new store
exports.addStore = async (req, res) => {
  const { name, location, dealer, products } = req.body;
  try {
    const store = new Store({ name, location, dealer, products });
    await store.save();
    res.status(201).json({ message: "Store added successfully", store });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stores
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("dealer", "name email").populate("products");
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Find nearest stores
exports.findNearestStores = async (req, res) => {
  const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters
  try {
    const stores = await Store.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(maxDistance),
        },
      },
    }).populate("dealer", "name email").populate("products");
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};