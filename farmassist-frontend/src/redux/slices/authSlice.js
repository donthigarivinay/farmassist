import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Helper function to set auth data in localStorage
const setAuthData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user)); // Store user data including role
};

// Helper function to clear auth data from localStorage
const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Helper function to get auth data from localStorage
const getAuthData = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user };
};

// Async thunk for registration
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });

      console.log("Register Response:", res.data); // Debug the response

      if (!res.data || !res.data.token || !res.data.user) {
        return rejectWithValue("Invalid response from server");
      }

      // Store token and user data in localStorage
      setAuthData(res.data.token, res.data.user);

      return res.data.user; // Return user data including role
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

      console.log("Login Response:", res.data); // Debug the response

      if (!res.data || !res.data.token || !res.data.user) {
        return rejectWithValue("Invalid response from server");
      }

      // Store token and user data in localStorage
      setAuthData(res.data.token, res.data.user);

      return res.data.user; // Return user data including role
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk to check authentication status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { token, user } = getAuthData(); // Get auth data from localStorage
      if (!token || !user) {
        return rejectWithValue("No authentication data found");
      }

      const res = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data || !res.data.user) {
        return rejectWithValue("Invalid authentication response");
      }

      // Store token and user data in localStorage
      setAuthData(token, res.data.user);

      return res.data.user; // Return user data including role
    } catch (err) {
      console.error("Auth Check Error:", err.response?.data || err.message);
      clearAuthData(); // Clear invalid or expired auth data
      return rejectWithValue(err.response?.data?.message || "Authentication check failed");
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    role: null, // Add role to the initial state
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null; // Clear role on logout
      clearAuthData(); // Clear localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload; // Set the entire user object
        state.role = action.payload.role; // Set the role
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload; // Set the entire user object
        state.role = action.payload.role; // Set the role
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload; // Set the entire user object
        state.role = action.payload.role; // Set the role
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.role = null; // Clear role on rejection
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;