const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;