"use client"

import { useState, useEffect } from "react"
import { ParkingLot } from "@/components/parkingLot"
import Header from "@/components/page/Header"
import AddVehicle from "@/components/page/AddVehicle"
import ParkingGrid from "@/components/page/ParkingGrid"
import Footer from "@/components/page/Footer"
import { Level } from "@/components/level"
import type { Vehicle } from "@/components/vehicle"
import { Bus } from "@/components/bus"
import { Car } from "@/components/car"
import { Motorcycle } from "@/components/motorcycle"
import { Toaster, toast } from "sonner"

const NUM_LEVELS = 3
const SPOTS_PER_LEVEL = 30

function createVehicleFromString(vehicleString: string, licensePlate = ""): Vehicle | null {
  switch (vehicleString) {
    case "🚌":
      return new Bus(licensePlate)
    case "🚗":
      return new Car(licensePlate)
    case "🛵":
      return new Motorcycle(licensePlate)
    default:
      return null
  }
}

const Index = () => {
  const [levels, setLevels] = useState<Level[]>([])
  const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeLevel, setActiveLevel] = useState(0)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const response = await fetch("/api/parking-lot")
        const data = await response.json()

        if (response.ok && data.levels && data.levels.length > 0) {
          const loadedLevels = data.levels.map((levelDoc: any) => {
            const level = new Level(levelDoc.floor, levelDoc.spots.length)
            levelDoc.spots.forEach((spotDoc: any, index: number) => {
              if (spotDoc.vehicle) {
                level.spots[index].vehicle = createVehicleFromString(spotDoc.vehicle, spotDoc.licensePlate || "")
              }
            })
            level.availableSpots = levelDoc.availableSpots
            return level
          })

          setLevels(loadedLevels)
          setParkingLot(new ParkingLot(loadedLevels))
        } else {
          const initialLevels = Array.from({ length: NUM_LEVELS }, (_, i) => new Level(i, SPOTS_PER_LEVEL))
          setLevels(initialLevels)
          setParkingLot(new ParkingLot(initialLevels))

          await fetch("/api/parking-lot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ levels: initialLevels.map((level) => level.toJSON()) }),
          })
        }
      } catch (error) {
        console.error("Initialization error:", error)
        const initialLevels = Array.from({ length: NUM_LEVELS }, (_, i) => new Level(i, SPOTS_PER_LEVEL))
        setLevels(initialLevels)
        setParkingLot(new ParkingLot(initialLevels))
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  const parkVehicle = async (vehicle: Vehicle) => {
    if (!parkingLot) return

    const success = parkingLot.parkVehicle(vehicle)
    if (!success) {
      toast.error("Parking lot is full! No available spots for this vehicle.")
      return
    }

    const updatedLevels = [...parkingLot.getLevels()]
    setLevels(updatedLevels)
    setParkingLot(new ParkingLot(updatedLevels))

    toast.success(`${getVehicleTypeName(vehicle)} with license plate ${vehicle.getLicensePlate()} parked successfully!`)
    await saveToServer(updatedLevels)
  }

  const getVehicleTypeName = (vehicle: Vehicle): string => {
    if (vehicle instanceof Bus) return "Bus"
    if (vehicle instanceof Car) return "Car"
    if (vehicle instanceof Motorcycle) return "Motorcycle"
    return "Vehicle"
  }

  const deleteVehicle = async (levelIndex: number, spotIndex: number) => {
    if (!parkingLot) return

    const licensePlate = levels[levelIndex].spots[spotIndex].getLicensePlate() || "Unknown"
    const vehicleType = getVehicleTypeFromEmoji(levels[levelIndex].spots[spotIndex].print())

    const success = parkingLot.removeVehicle(levelIndex, spotIndex)
    if (!success) {
      toast.error("Failed to remove vehicle!")
      return
    }

    const updatedLevels = [...parkingLot.getLevels()]
    setLevels(updatedLevels)
    setParkingLot(new ParkingLot(updatedLevels))

    toast.success(`${vehicleType} with license plate ${licensePlate} removed successfully!`)
    await saveToServer(updatedLevels)
  }

  const getVehicleTypeFromEmoji = (emoji: string): string => {
    switch (emoji) {
      case "🚌":
        return "Bus"
      case "🚗":
        return "Car"
      case "🛵":
        return "Motorcycle"
      default:
        return "Vehicle"
    }
  }

  const saveToServer = async (updatedLevels: Level[]) => {
    try {
      await fetch("/api/parking-lot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levels: updatedLevels.map((level) => level.toJSON()) }),
      })
    } catch (error) {
      console.error("Error saving to server:", error)
      toast.error("Failed to save changes to server!")
    }
  }

  const changeLevel = (levelIndex: number) => {
    if (levelIndex >= 0 && levelIndex < levels.length) {
      setActiveLevel(levelIndex)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading Parking System...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_2fr] gap-6">
          <div className="space-y-6">
            <AddVehicle parkingLotObject={parkingLot!} onPark={parkVehicle} />
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-800">Parking Statistics</h2>
              </div>
              
              <div className="space-y-4">
                {levels.map((level, index) => {
                  const occupancyPercentage = ((level.spots.length - level.availableSpots) / level.spots.length) * 100;
                  const getBarColor = (percentage: number) => {
                    if (percentage < 50) return "bg-green-500";
                    if (percentage < 80) return "bg-yellow-500";
                    return "bg-red-500";
                  };
                  
                  return (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 transition-all hover:bg-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">Level {index + 1}</span>
                        <div className="flex items-center">
                          <span className={`text-sm font-bold ${level.availableSpots < 3 ? 'text-red-600' : level.availableSpots < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {level.availableSpots}
                          </span>
                          <span className="text-sm text-gray-600 mx-1">/</span>
                          <span className="text-sm text-gray-600">{level.spots.length}</span>
                          <span className="text-sm ml-1 text-gray-600">available</span>
                        </div>
                      </div>
                      
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${getBarColor(occupancyPercentage)}`}
                          style={{
                            width: `${occupancyPercentage}%`,
                          }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Empty</span>
                        <span className="text-xs text-gray-500">Full</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Available:</span>
                  <span className="font-bold text-blue-600">
                    {levels.reduce((sum, level) => sum + level.availableSpots, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="flex border-b border-gray-200">
                {levels.map((_, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                      activeLevel === index ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => changeLevel(index)}
                  >
                    Level {index + 1}
                  </button>
                ))}
              </div>
              <div className="p-4">
                <ParkingGrid level={levels[activeLevel]} levelIndex={activeLevel} onDeleteVehicle={deleteVehicle} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Index
