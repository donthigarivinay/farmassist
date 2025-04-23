// Cart.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, setCart, clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Load cart from localStorage only if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart && savedCart.length > 0) {
        dispatch(setCart(savedCart));
      }
    }
  }, [dispatch, isAuthenticated]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 p-8">
      <h2 className="text-3xl font-extrabold text-earthyGreen mb-8">Your Cart</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {items.length === 0 ? (
          <p className="text-center text-xl font-semibold text-gray-600">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4 hover:bg-gray-50 transition duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold text-earthyGreen">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                  }
                  className="w-16 p-2 border rounded-md focus:ring-2 focus:ring-earthyGreen"
                />
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold text-earthyBrown">Total: ₹{total}</div>
          <button className="btn-farm-primary py-2 px-6 rounded-lg text-white font-semibold mt-4 transition duration-300 hover:bg-green-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;