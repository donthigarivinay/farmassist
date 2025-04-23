import React, { useState } from "react";

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-earthyBrown mb-6">
        {type === "login" ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit}>
        {type === "register" && (
          <>
            <div className="mb-4">
              <label className="block text-earthyBrown mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-earthyBrown rounded"
                required
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-earthyBrown mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-earthyBrown rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-earthyBrown mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-earthyBrown rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-earthyBrown text-white py-2 rounded hover:bg-earthyYellow transition-colors"
        >
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
































