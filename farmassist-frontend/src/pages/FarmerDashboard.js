import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/FarmerDashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:5000/api/user/FarmerDashboard", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(formData);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">Hello, {user.name.split(" ")[0]}</p>
          </div>
        </div>
        <nav className="mt-6 space-y-4">
          <p className="text-gray-600 font-semibold">ACCOUNT SETTINGS</p>
          <a href="#" className="block text-blue-600 font-medium">Profile Information</a>
          <a href="#" className="block text-gray-600">Manage Addresses</a>
          <a href="#" className="block text-gray-600">PAN Card Information</a>
          <p className="text-gray-600 font-semibold mt-4">PAYMENTS</p>
          <a href="#" className="block text-gray-600">Gift Cards</a>
          <a href="#" className="block text-gray-600">Saved UPI</a>
          <a href="#" className="block text-gray-600">Saved Cards</a>
          <p className="text-gray-600 font-semibold mt-4">MY STUFF</p>
          <a href="#" className="block text-gray-600">My Coupons</a>
          <a href="#" className="block text-gray-600">My Reviews & Ratings</a>
          <a href="#" className="block text-gray-600">All Notifications</a>
          <a href="#" className="block text-gray-600">My Wishlist</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Personal Information</h2>
          {editMode ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600">First Name</label>
                  <input name="firstName" value={formData.firstName || ""} onChange={handleChange} className="p-2 bg-gray-100 rounded w-full" />
                </div>
                <div>
                  <label className="text-gray-600">Last Name</label>
                  <input name="lastName" value={formData.lastName || ""} onChange={handleChange} className="p-2 bg-gray-100 rounded w-full" />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-gray-600">Gender</label>
                <input name="gender" value={formData.gender || ""} onChange={handleChange} className="p-2 bg-gray-100 rounded w-full" />
              </div>
              <div className="mt-4">
                <label className="text-gray-600">Email Address</label>
                <input name="email" value={formData.email || ""} onChange={handleChange} className="p-2 bg-gray-100 rounded w-full" />
              </div>
              <div className="mt-4">
                <label className="text-gray-600">Mobile Number</label>
                <input name="phone" value={formData.phone || ""} onChange={handleChange} className="p-2 bg-gray-100 rounded w-full" />
              </div>
              <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditMode(false)} className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <p><span className="font-semibold">Name:</span> {user.name}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p><span className="font-semibold">Gender:</span> {user.gender}</p>
              </div>
              <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;