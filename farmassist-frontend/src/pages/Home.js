import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // For dispatching the add-to-cart action

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle search input change
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle adding product to the cart
  const handleAddToCart = (product) => {
    // Dispatch the action to add the product to the cart
    dispatch({
      type: "ADD_TO_CART", // Assuming you have a Redux action for this
      payload: product,
    });
  };

  const products = [
    {
      id: 1,
      name: "Organic Fertilizer",
      description: "Enhance soil fertility and boost crop yield.",
      image: "https://via.placeholder.com/300x200.png?text=Organic+Fertilizer", // Placeholder image
      price: 25.99,
    },
    {
      id: 2,
      name: "Pesticide Spray",
      description: "Protect your crops from harmful pests and diseases.",
      image: "https://via.placeholder.com/300x200.png?text=Pesticide+Spray", // Placeholder image
      price: 15.99,
    },
    {
      id: 3,
      name: "Seed Planter",
      description: "Efficient planting tool for various crops.",
      image: "https://via.placeholder.com/300x200.png?text=Seed+Planter", // Placeholder image
      price: 35.99,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-600">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div
          className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 text-earthyBrown
          transition duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <h1 className="text-5xl font-extrabold text-earthyBlack mb-4">
            Welcome to FarmAssist
          </h1>
          <p className="text-lg text-black mb-8 italic">
            "Empowering Farmers with Smart Agricultural Solutions"
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6 flex justify-center gap-2">
            <input
              type="text"
              placeholder="Search for products..."
              className="px-4 py-2 border rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-earthyYellow text-earthyBrown py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition duration-300"
            >
              Browse
            </button>
          </form>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-earthyBlack mb-6 text-center">
          Trending Products for Farmers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition transform"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold text-earthyBlack mt-4">
                {product.name}
              </h3>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <p className="text-earthyYellow font-semibold mt-2">${product.price}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-earthyYellow text-earthyBrown py-2 px-4 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition duration-300"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="text-earthyYellow hover:text-yellow-600 font-semibold"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
