import React, { useState } from "react";

const DealerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [dealerDetails, setDealerDetails] = useState({
    name: "Dealer Name",
    email: "dealer@example.com",
    phone: "123-456-7890",
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: "", price: "" });
    }
  };

  const handleEditProduct = (index, updatedProduct) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dealer Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border rounded"
          />
          <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 rounded">
            Add Product
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index} className="mb-2">
              <div className="flex gap-4 items-center">
                <span>{product.name} - ${product.price}</span>
                <button
                  onClick={() =>
                    handleEditProduct(index, { ...product, price: prompt("Enter new price", product.price) })
                  }
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveProduct(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Dealer Details</h2>
        <div className="space-y-2">
          <p>Name: {dealerDetails.name}</p>
          <p>Email: {dealerDetails.email}</p>
          <p>Phone: {dealerDetails.phone}</p>
          <button
            onClick={() => {
              const name = prompt("Enter new name", dealerDetails.name);
              const email = prompt("Enter new email", dealerDetails.email);
              const phone = prompt("Enter new phone", dealerDetails.phone);
              if (name && email && phone) {
                setDealerDetails({ name, email, phone });
              }
            }}
            className="bg-green-500 text-white p-2 rounded"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;