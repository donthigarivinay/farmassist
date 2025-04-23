import React, { useState } from "react";

const DeliveryAgentPage = () => {
  const [deliveries, setDeliveries] = useState(10);
  const [profit, setProfit] = useState(500);
  const [vehicleInfo, setVehicleInfo] = useState({
    type: "Bike",
    number: "AB-1234",
  });
  const [agentInfo, setAgentInfo] = useState({
    name: "Agent Name",
    email: "agent@example.com",
    phone: "987-654-3210",
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Delivery Agent Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Delivery Stats</h2>
        <div className="space-y-2">
          <p>Total Deliveries: {deliveries}</p>
          <p>Total Profit Earned: ${profit}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
        <div className="space-y-2">
          <p>Vehicle Type: {vehicleInfo.type}</p>
          <p>Vehicle Number: {vehicleInfo.number}</p>
          <button
            onClick={() => {
              const type = prompt("Enter vehicle type", vehicleInfo.type);
              const number = prompt("Enter vehicle number", vehicleInfo.number);
              if (type && number) {
                setVehicleInfo({ type, number });
              }
            }}
            className="bg-green-500 text-white p-2 rounded"
          >
            Edit Vehicle Info
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Agent Information</h2>
        <div className="space-y-2">
          <p>Name: {agentInfo.name}</p>
          <p>Email: {agentInfo.email}</p>
          <p>Phone: {agentInfo.phone}</p>
          <button
            onClick={() => {
              const name = prompt("Enter new name", agentInfo.name);
              const email = prompt("Enter new email", agentInfo.email);
              const phone = prompt("Enter new phone", agentInfo.phone);
              if (name && email && phone) {
                setAgentInfo({ name, email, phone });
              }
            }}
            className="bg-green-500 text-white p-2 rounded"
          >
            Edit Agent Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgentPage;