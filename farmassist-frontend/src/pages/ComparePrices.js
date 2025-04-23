import React, { useEffect, useState } from "react";
import axios from "axios";

const ComparePrice = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products/compare");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-earthyGreen-50 p-8">
      <h2 className="text-2xl font-bold text-earthyBrown mb-8">Price Comparison</h2>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-earthyGreen text-white">
              <th className="p-3">Product</th>
              <th className="p-3">Store</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.store.name}</td>
                <td className="p-3">₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePrice;