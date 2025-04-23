const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["farmer", "dealer", "delivery_agent"], default: "farmer" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    paymentMethods: { type: Array, default: [] },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model("User", userSchema);