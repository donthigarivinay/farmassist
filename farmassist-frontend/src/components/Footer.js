import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-600 to-purple-400 text-earthyB p-8 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Details */}
        <div>
          <h3 className="text-earthyYellow text-xl font-bold mb-4">Contact Us</h3>
          <p>Email: support@farmassist.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: 123 Farm Street, Farmland</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-earthyYellow text-xl font-bold mb-4">Quick Links</h3>
          <ul>
            <li><a href="/" className="hover:text-earthyYellow transition-colors duration-300">Home</a></li>
            <li><a href="/products" className="hover:text-earthyYellow transition-colors duration-300">Products</a></li>
            <li><a href="/cart" className="hover:text-earthyYellow transition-colors duration-300">Cart</a></li>
            <li><a href="/login" className="hover:text-earthyYellow transition-colors duration-300">Login</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-earthyYellow text-xl font-bold mb-4">About Us</h3>
          <p>FarmAssist is dedicated to empowering farmers with the best tools and resources.</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-earthyBlack pt-4">
        <p>&copy; 2025 FarmAssist. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
