import axios from "axios";
import { handleApiError } from "./helpers";

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api", // Backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response.data, // Return only the data from the response
  (error) => {
    const errorMessage = handleApiError(error);
    return Promise.reject(errorMessage); // Reject with a user-friendly error message
  }
);

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    const { status, data } = error.response;
    switch (status) {
      case 401:
        return data.message || "Unauthorized: Please log in again.";
      case 403:
        return data.message || "Forbidden: You do not have permission to access this resource.";
      case 404:
        return data.message || "Resource not found.";
      case 500:
        return data.message || "Server error: Please try again later.";
      default:
        return data.message || "An error occurred. Please try again.";
    }
  } else if (error.request) {
    // The request was made but no response was received
    return "Network error: Please check your internet connection.";
  } else {
    // Something happened in setting up the request
    return "Request error: Please try again.";
  }
};

// Auth API
export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  checkAuth: () => api.get("/auth/me"), // Endpoint to check authentication status
};

// User API
export const userApi = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (profileData) => api.put("/user/profile", profileData),
  deleteProfile: () => api.delete("/user/profile"),
};

// Product API
export const productApi = {
  getProducts: () => api.get("/products"),
  getProductById: (id) => api.get(`/products/${id}`),
  addProduct: (productData) => api.post("/products", productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Order API
export const orderApi = {
  createOrder: (orderData) => api.post("/orders", orderData),
  getUserOrders: (userId) => api.get(`/orders/${userId}`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}`, { status }),
};

// Store API
export const storeApi = {
  getStores: () => api.get("/stores"),
  addStore: (storeData) => api.post("/stores", storeData),
  findNearestStores: (longitude, latitude, maxDistance) =>
    api.get("/stores/nearest", { params: { longitude, latitude, maxDistance } }),
};

// Cart API
export const cartApi = {
  addToCart: (productId, quantity) => api.post("/cart", { productId, quantity }),
  getCart: () => api.get("/cart"),
  updateCartItem: (productId, quantity) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
};

// Payment API
export const paymentApi = {
  createPayment: (orderId, amount) => api.post("/payment", { orderId, amount }),
  verifyPayment: (paymentId) => api.get(`/payment/verify/${paymentId}`),
};

export default api;