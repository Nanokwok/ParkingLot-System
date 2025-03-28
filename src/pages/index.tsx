// pages/index.tsx
import React from "react";
import { ParkingLot } from "@/components/parkingLot";
import Header from "@/components/page/Header";
import AddVehicle from "@/components/page/AddVehicle";
import ParkingGrid from "@/components/page/ParkingGrid";
import Footer from "@/components/page/Footer";
import { useState } from "react";
import { Level } from "@/components/level";
import { Vehicle } from "@/components/vehicle";

const Index: React.FC = () => {
  const NUM_LEVELS = 10;
  const [levels] = useState<Level[]>(
    Array.from({ length: NUM_LEVELS }, (_, i) => new Level(i, 30))
  );
  const [parkingLot, setParkingLot] = useState(new ParkingLot(levels));

  const parkVehicle = (vehicle: Vehicle) => {
    const success = parkingLot.parkVehicle(vehicle);
    setParkingLot(new ParkingLot([...levels]));
    if (!success) {
      alert("Parking lot is full!");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between items-center">
      <Header />

      <AddVehicle parkingLotObject={parkingLot} onPark={parkVehicle} />

      <ParkingGrid levels={levels} />

      <Footer />
    </div>
  );
};

export default Index;
