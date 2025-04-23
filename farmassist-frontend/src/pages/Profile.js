import React from "react";
import { useSelector } from "react-redux";
import FarmerDashboard from "./FarmerDashboard";
import DealerDashboard from "./DealerDashboard";
import DeliveryAgentPage from "./DeliveryAgentPage";

const Profile = () => {
  const { role } = useSelector((state) => state.auth);

  console.log("User Role:", role); // Debug the role value

  // Render the appropriate profile based on the user's role
  const renderProfile = () => {
    switch (role) {
      case "farmer":
        return <FarmerDashboard />;
      case "dealer":
        return <DealerDashboard />;
      case "delivery_agent":
        return <DeliveryAgentPage />;
      default:
        return <div>No profile found for this role.</div>;
    }
  };

  return (
    <div>
      <h1>Your Profile</h1>
      {renderProfile()}
    </div>
  );
};

export default Profile;