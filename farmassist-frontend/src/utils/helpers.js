// src/utils/helpers.js

/**
 * Format price with currency symbol and commas
 * @param {number} price 
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  /**
   * Truncate long text with ellipsis
   * @param {string} text 
   * @param {number} maxLength 
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };
  
  /**
   * Calculate distance between coordinates (Haversine formula)
   * @param {number} lat1 
   * @param {number} lon1 
   * @param {number} lat2 
   * @param {number} lon2 
   * @returns {number} Distance in kilometers
   */
  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };
  
  /**
   * Check user role permissions
   * @param {string} userRole 
   * @param {string} requiredRole 
   * @returns {boolean} Has permission
   */
  export const checkPermission = (userRole, requiredRole) => {
    const roleHierarchy = {
      user: ['farmer'],
      dealer: ['farmer', 'dealer'],
      delivery: ['farmer', 'delivery_agent'],
      admin: ['farmer', 'dealer', 'delivery_agent', 'admin']
    };
    return roleHierarchy[requiredRole].includes(userRole);
  };
  
  /**
   * Generate product image URL
   * @param {string} imageName 
   * @returns {string} Full image URL
   */
  export const getProductImage = (imageName) => {
    return `${process.env.PUBLIC_URL}/assets/images/products/${imageName}`;
  };
  
  /**
   * Handle API errors
   * @param {Error} error 
   * @returns {string} Error message
   */
  export const handleApiError = (error) => {
    console.error('API Error:', error);
    return error.response?.data?.error ||
           error.request?.statusText ||
           error.message ||
           'An unexpected error occurred';
  };
  
  /**
   * Validate email format
   * @param {string} email 
   * @returns {boolean} Is valid email
   */
  export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };