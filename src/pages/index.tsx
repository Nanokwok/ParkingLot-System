import React, { useState, useEffect } from "react";
import { ParkingLot } from "@/components/parkingLot";
import Header from "@/components/page/Header";
import AddVehicle from "@/components/page/AddVehicle";
import ParkingGrid from "@/components/page/ParkingGrid";
import Footer from "@/components/page/Footer";
import { Level } from "@/components/level";
import { Vehicle } from "@/components/vehicle";
import { Bus } from "@/components/bus";
import { Car } from "@/components/car";
import { Motorcycle } from "@/components/motorcycle";

const NUM_LEVELS = 10;
const SPOTS_PER_LEVEL = 30;

function createVehicleFromString(vehicleString: string): Vehicle | null {
  switch (vehicleString) {
    case '🚌': return new Bus();
    case '🚗': return new Car();
    case '🛵': return new Motorcycle();
    default: return null;
  }
}

const Index: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const response = await fetch('/api/parking-lot');
        const data = await response.json();
        
        if (response.ok && data.levels) {
          const loadedLevels = data.levels.map((levelDoc: any) => {
            const level = new Level(levelDoc.floor, levelDoc.spots.length);
            levelDoc.spots.forEach((spotDoc: any, index: number) => {
              if (spotDoc.vehicle) {
                level.spots[index].vehicle = createVehicleFromString(spotDoc.vehicle);
              }
            });
            level.availableSpots = levelDoc.availableSpots;
            return level;
          });
          
          setLevels(loadedLevels);
          setParkingLot(new ParkingLot(loadedLevels));
        } else {
          const initialLevels = Array.from({ length: NUM_LEVELS }, (_, i) => new Level(i, SPOTS_PER_LEVEL));
          setLevels(initialLevels);
          setParkingLot(new ParkingLot(initialLevels));
          
          await fetch('/api/parking-lot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ levels: initialLevels.map(level => level.toJSON()) }),
          });
        }
      } catch (error) {
        console.error("Initialization error:", error);
        const initialLevels = Array.from({ length: NUM_LEVELS }, (_, i) => new Level(i, SPOTS_PER_LEVEL));
        setLevels(initialLevels);
        setParkingLot(new ParkingLot(initialLevels));
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const parkVehicle = async (vehicle: Vehicle) => {
    if (!parkingLot) return;

    const success = parkingLot.parkVehicle(vehicle);
    if (!success) {
      alert("Parking lot is full!");
      return;
    }

    const updatedLevels = [...parkingLot.getLevels()];
    setLevels(updatedLevels);
    setParkingLot(new ParkingLot(updatedLevels));
    
    await fetch('/api/parking-lot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ levels: updatedLevels.map(level => level.toJSON()) }),
    });
  };

  if (isLoading) {
    return <div className="bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between items-center">
      <Header />
      <AddVehicle parkingLotObject={parkingLot!} onPark={parkVehicle} />
      <ParkingGrid levels={levels} />
      <Footer />
    </div>
  );
};

export default Index;