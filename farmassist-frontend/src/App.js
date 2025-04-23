// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';

import './index.css';
import Navbar from './components/Navbar';
import store from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ComparePrice from './pages/ComparePrices';
import NearestStores from './pages/NearestStores';
import FarmerDashboard from './pages/FarmerDashboard';
import DealerDashboard from './pages/DealerDashboard';
import DeliveryAgentPage from './pages/DeliveryAgentPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetails from './pages/ProductDetails';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/farmer-profile" element={<FarmerDashboard />} />
              <Route path="/dealer-profile" element={<DealerDashboard />} />
              <Route path="/delivery-agent-profile" element={<DeliveryAgentPage />} />              
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/compare-prices" element={<ComparePrice />} />
              <Route path="/nearest-stores" element={<NearestStores />} />

              {/* Protected Routes */}
              <Route
            path="/FarmerDashboard"
            element={
              <ProtectedRoute role="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DealerDashboard"
            element={
              <ProtectedRoute role="dealer">
                <DealerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DeliveryAgentPage"
            element={
              <ProtectedRoute role="delivery_agent">
                <DeliveryAgentPage />
              </ProtectedRoute>
            }
          />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;