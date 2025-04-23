import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details", err);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-earthyGreen mb-4">₹{product.price}</p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
