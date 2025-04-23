import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity; // Update quantity if item already exists
      } else {
        state.items.push(action.payload); // Add new item to cart
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setCart: (state, action) => {
      state.items = action.payload; // Initialize cart with saved data
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;