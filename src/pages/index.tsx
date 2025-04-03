import React, { useState, useEffect } from "react";
import Header from "@/components/page/Header";
import AddVehicle from "@/components/page/AddVehicle";
import ParkingGrid from "@/components/page/ParkingGrid";
import Footer from "@/components/page/Footer";
import { Vehicle } from "@/pages/api/vehicle";
import { ParkingLot } from "@/pages/api/parkingLot";

const Index: React.FC = () => {
  const [levels, setLevels] = useState([]);
  const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null);

  // useEffect(() => {
  //   const fetchLevels = async () => {
  //     try {
  //       const response = await fetch("/api/levels");
  //       const data = await response.json();
  //       setLevels(data);
  //       setParkingLot(new ParkingLot(data)); // Initialize parking lot
  //     } catch (error) {
  //       console.error("Error fetching levels:", error);
  //     }
  //   };

  //   fetchLevels();
  // }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example data for a new parking level (adjust this as needed)
    const newLevel = {
      floor: 1,
      spots: [
        { spotNumber: 0, spotSize: "Large", vehicle: null },
        { spotNumber: 1, spotSize: "Large", vehicle: null },
        { spotNumber: 2, spotSize: "Large", vehicle: null },
        { spotNumber: 3, spotSize: "Large", vehicle: null },
        { spotNumber: 4, spotSize: "Large", vehicle: null },
        { spotNumber: 5, spotSize: "Large", vehicle: null },
        { spotNumber: 6, spotSize: "Compact", vehicle: null },
        { spotNumber: 7, spotSize: "Compact", vehicle: null },
        { spotNumber: 8, spotSize: "Compact", vehicle: null },
        { spotNumber: 9, spotSize: "Motercycle", vehicle: null },
      ],
    };
  
    try {
      const response = await fetch("/api/levels/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLevel), // sending newLevel, not newUser
      });
  
      console.log("🔍 Response status:", response.status);
  
      const result = await response.json();
      console.log("Response data:", result);
  
      if (!response.ok) {
        throw new Error(result.error || "Unknown error");
      }
  
      console.log("✅ Level added:", result);
      // Update parking lot if necessary
    } catch (error) {
      console.error("❌ Error saving level:", error);
    }
  };
  

  const parkVehicle = (vehicle: Vehicle) => {
    if (!parkingLot) return;

    const success = parkingLot.parkVehicle(vehicle);
    setParkingLot(new ParkingLot([...levels])); // Refresh parking lot

    if (!success) {
      alert("Parking lot is full!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between items-center">
      <Header />
      {parkingLot && <AddVehicle parkingLotObject={parkingLot} onPark={parkVehicle} />}
      <ParkingGrid levels={levels} />
      <Footer />
      <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
    </div>
    
  );
};

export default Index;
