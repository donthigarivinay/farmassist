import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-earthyBrown text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-earthyGreen font-bold">₹{product.price}</p>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-earthyBrown text-white py-2 rounded hover:bg-earthyYellow transition-colors"
        >
          Add to Cart
        </button>

        {/* View Details Link */}
        <Link
          to={`/products/${product._id}`}
          className="block mt-2 text-center text-earthyGreen hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
