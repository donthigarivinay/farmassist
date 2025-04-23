import React, { useEffect } from "react";

const NearestStores = () => {
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (document.getElementById("google-maps-script")) return;

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initMap(); // Initialize map after script loads
      };
    };

    const initMap = () => {
      if (!window.google || !window.google.maps) return;

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 12.9716, lng: 77.5946 }, // Bengaluru coordinates
        zoom: 12,
      });

      // Add markers (Example)
      new window.google.maps.Marker({
        position: { lat: 12.9716, lng: 77.5946 },
        map,
        title: "Bengaluru",
      });

      // Fetch and add markers dynamically (Uncomment if API is available)
      // fetch('/api/stores/nearest')
      //   .then(response => response.json())
      //   .then(data => {
      //     data.forEach(store => {
      //       new window.google.maps.Marker({
      //         position: { lat: store.lat, lng: store.lng },
      //         map,
      //         title: store.name,
      //       });
      //     });
      //   });
    };

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      loadGoogleMapsScript();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-yellow-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-earthyBrown mb-8 text-center">Nearest Stores</h2>
        <div id="map" className="map-container w-full h-96 rounded-lg shadow-lg"></div>
      </div>
    </div>
  );
};

export default NearestStores;
