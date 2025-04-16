"use client"

import { useState, useEffect } from "react";
import { ParkingLot } from "@/models/ParkingLot";
import Header from "@/components/Header";
import AddVehicle from "@/components/AddVehicle";
import ParkingGrid from "@/components/ParkingGrid";
import Footer from "@/components/Footer";
import { Level } from "@/models/Level";
import { Vehicle } from "@/models/Vehicle";
import { Toaster, toast } from "sonner";
import ParkingStatistics from "@/components/ParkingStatistics";
import { VehicleFactory } from "@/models/VehicleFactory";

const LoadingSpinner = () => (
  <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <div className="text-xl font-semibold text-gray-700">
        Loading Parking System...
      </div>
    </div>
  </div>
);

const Index = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const loadedParkingLot = await ParkingLot.load();
        setLevels(loadedParkingLot.getLevels());
        setParkingLot(loadedParkingLot);
      } catch (error) {
        console.error("Initialization error:", error);
        const defaultParkingLot = ParkingLot.createDefault();
        setLevels(defaultParkingLot.getLevels());
        setParkingLot(defaultParkingLot);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleVehicleOperation = async (
    operation: () => boolean,
    successMessage: string,
    errorMessage: string
  ) => {
    if (!parkingLot) return false;

    const success = operation();
    if (!success) {
      toast.error(errorMessage);
      return false;
    }

    const updatedLevels = [...parkingLot.getLevels()];
    setLevels(updatedLevels);
    setParkingLot(new ParkingLot(updatedLevels));
    toast.success(successMessage);

    try {
      await parkingLot.save();
      return true;
    } catch (error) {
      toast.error("Failed to save changes to server!");
      return false;
    }
  };

  const parkVehicle = async (vehicle: Vehicle) => {
    await handleVehicleOperation(
      () => parkingLot!.parkVehicle(vehicle),
      `${VehicleFactory.getNameFromVehicle(vehicle)} with license plate ${
        vehicle.getLicensePlate()
      } parked successfully!`,
      "Parking lot is full! No available spots for this vehicle."
    );
  };

  const deleteVehicle = async (levelIndex: number, spotIndex: number) => {
    const spot = levels[levelIndex].spots[spotIndex];
    const licensePlate = spot.getLicensePlate() || "Unknown";
    const vehicleType = VehicleFactory.getNameFromEmoji(spot.print());

    await handleVehicleOperation(
      () => parkingLot!.removeVehicle(levelIndex, spotIndex),
      `${vehicleType} with license plate ${licensePlate} removed successfully!`,
      "Failed to remove vehicle!"
    );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_2fr] gap-6">
          <div className="space-y-6">
            <AddVehicle parkingLotObject={parkingLot!} onPark={parkVehicle} />
            <ParkingStatistics levels={levels} />
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="flex border-b border-gray-200">
                {levels.map((_, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                      activeLevel === index
                        ? "bg-blue-500 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveLevel(index)}
                  >
                    Level {index + 1}
                  </button>
                ))}
              </div>
              <div className="p-4">
                <ParkingGrid
                  level={levels[activeLevel]}
                  levelIndex={activeLevel}
                  onDeleteVehicle={deleteVehicle}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;