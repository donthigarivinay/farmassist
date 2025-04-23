import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState("");
  
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/orders", {
        items,
        total,
        shippingAddress,
      });
      // Handle payment integration (Razorpay/Stripe)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-earthyGreen-50 p-8">
      <div className="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-earthyBrown mb-6">Checkout</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-earthyBrown mb-2">Shipping Address</label>
          <textarea
            className="w-full p-2 border rounded"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        <button onClick={handlePayment} className="btn-farm-primary w-full">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;