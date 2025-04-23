// utils/auth.js
export const setAuthData = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store user data including role
  };
  
  export const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };