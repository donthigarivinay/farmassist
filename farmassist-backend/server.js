const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import the connectDB function
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user"); // Import user routes

// Import error handler
const errorHandler = require("./utils/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Explicitly allow frontend origin
  credentials: true // If using cookies/auth headers
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("FarmAssist Backend is running!");
});
app.get("/api/user/profile", async (req, res) => {
  try {
    // Extract user ID or email from the request (e.g., from query parameters or headers)
    const { userId, email } = req.query;

    if (!userId && !email) {
      return res.status(400).json({ success: false, message: "User ID or email is required" });
    }

    // Find the user in the database
    const user = await User.findOne({ $or: [{ _id: userId }, { email }] }).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Return the user's profile data
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ===== Fix: Reorder routes =====
// User Routes should come before more generic "/api" routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // Moved up before other /api routes
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));