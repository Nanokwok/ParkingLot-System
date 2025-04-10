"use client"

import type React from "react"
import { useState } from "react"
import type { Level } from "@/components/level"
import type { ParkingSpot } from "@/components/parkingSpot"
import { VehicleSize } from "@/types/vehicleSize"

interface ParkingGridProps {
  level: Level
  levelIndex: number
  onDeleteVehicle: (levelIndex: number, spotIndex: number) => void
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ level, levelIndex, onDeleteVehicle }) => {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!level) {
    return <div className="p-6 text-center text-gray-500">No parking data available</div>
  }

  const handleSpotClick = (spotIndex: number) => {
    if (level.spots[spotIndex].vehicle) {
      setSelectedSpot(spotIndex)
      setConfirmDelete(false)
    }
  }

  const handleDeleteClick = () => {
    setConfirmDelete(true)
  }

  const confirmDeleteVehicle = () => {
    if (selectedSpot !== null) {
      onDeleteVehicle(levelIndex, selectedSpot)
      setSelectedSpot(null)
      setConfirmDelete(false)
    }
  }

  const cancelDelete = () => {
    setConfirmDelete(false)
  }

  const closeDetails = () => {
    setSelectedSpot(null)
    setConfirmDelete(false)
  }

  const renderSpotDetails = () => {
    if (selectedSpot === null) return null

    const spot = level.spots[selectedSpot]
    if (!spot.vehicle) return null

    const vehicleType = spot.print() === "🚌" 
      ? "Bus" 
      : spot.print() === "🚗" 
        ? "Car" 
        : spot.print() === "🛵" 
          ? "Motorcycle" 
          : "Unknown"

    const spotSize = spot.getSize() === VehicleSize.Motorcycle 
      ? "Motorcycle" 
      : spot.getSize() === VehicleSize.Compact 
        ? "Compact" 
        : "Large"

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
          <button 
            onClick={closeDetails} 
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!confirmDelete ? (
            <>
              <div className="text-center mb-3">
                <span className="text-6xl">{spot.print()}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center border-b pb-2">Vehicle Details</h3>
              <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Type:</span>
                  <span className="font-semibold text-gray-900 bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {vehicleType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">License Plate:</span>
                  <span className="font-mono font-semibold text-gray-900 bg-blue-100 px-3 py-1 rounded-full text-sm">
                    {spot.getLicensePlate() || "Not registered"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Location:</span>
                  <span className="font-semibold text-gray-900 bg-gray-200 px-3 py-1 rounded-full text-sm">
                    Level {levelIndex + 1}, Spot {selectedSpot + 1}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Spot Size:</span>
                  <span className="font-semibold text-gray-900 bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {spotSize}
                  </span>
                </div>
              </div>
              <button
                onClick={handleDeleteClick}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Remove Vehicle
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <span className="text-6xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Confirm Removal</h3>
              <p className="text-gray-700 mb-6 text-center bg-red-50 p-4 rounded-lg border border-red-100">
                Are you sure you want to remove the <strong>{vehicleType}</strong> with license plate{" "}
                <strong className="font-mono">{spot.getLicensePlate() || "Unknown"}</strong>?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteVehicle}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  const renderSpot = (spot: ParkingSpot, spotIndex: number) => {
    const isOccupied = spot.vehicle !== null
    const isSelected = selectedSpot === spotIndex

    let bgColor = "bg-gray-100"
    let borderColor = "border-gray-300"
    let textColor = "text-gray-500"
    let hoverEffect = ""
    
    if (isOccupied) {
      bgColor = "bg-green-100"
      borderColor = "border-green-400"
      textColor = "text-gray-900"
      hoverEffect = "hover:bg-green-200 hover:shadow-md"
    }

    if (isSelected) {
      bgColor = "bg-blue-100"
      borderColor = "border-blue-500"
      textColor = "text-blue-800"
      hoverEffect = "shadow-md"
    }

    return (
      <button
        key={spotIndex}
        className={`h-full aspect-square ${bgColor} ${borderColor} border rounded-lg flex flex-col items-center justify-center transition-all ${hoverEffect} relative ${isOccupied ? "cursor-pointer" : "cursor-default"}`}
        onClick={() => handleSpotClick(spotIndex)}
        disabled={!isOccupied}
        aria-label={`Parking spot ${spotIndex + 1}`}
      >
        <div className={`text-xl sm:text-2xl md:text-3xl ${textColor}`}>
          {spot.print() === "compact"
            ? "C"
            : spot.print() === "large"
              ? "L"
              : spot.print() === "motor"
                ? "M"
                : spot.print()}
        </div>
        {spot.getLicensePlate() && (
          <div className="absolute bottom-1 left-1 right-1 text-xs text-center font-medium text-black bg-white bg-opacity-80 rounded-sm py-1 truncate">
            {spot.getLicensePlate()}
          </div>
        )}
      </button>
    )
  }

  // Calculate the optimal spots per row based on total count
  const calculateSpotsPerRow = () => {
    const totalSpots = level.spots.length;
    if (totalSpots <= 15) return 5;
    if (totalSpots <= 20) return 5;
    if (totalSpots <= 30) return 6;
    return 6; // Default to 6 for larger parking lots
  };

  const spotsPerRow = calculateSpotsPerRow();
  
  // Calculate occupancy metrics for this level
  const occupiedSpots = level.spots.filter(spot => spot.vehicle).length;
  const totalSpots = level.spots.length;
  const occupancyPercentage = (occupiedSpots / totalSpots) * 100;
  
  // Determine the color for the occupancy bar
  const getBarColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const rows = [];
  for (let i = 0; i < level.spots.length; i += spotsPerRow) {
    rows.push(level.spots.slice(i, i + spotsPerRow));
  }

  return (
    <div className="relative">
      <div className="mb-4 bg-gray-50 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Level {levelIndex + 1} Overview</h2>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Occupancy</span>
          <div className="flex items-center">
            <span className="text-sm font-bold text-green-600">{occupiedSpots}</span>
            <span className="text-sm text-gray-600 mx-1">/</span>
            <span className="text-sm text-gray-600">{totalSpots}</span>
            <span className="text-sm ml-1 text-gray-600">spots filled</span>
          </div>
        </div>
        
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${getBarColor(occupancyPercentage)}`}
            style={{ width: `${occupancyPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">Empty</span>
          <span className="text-xs text-gray-500">Full</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
          {level.spots.map((spot, spotIndex) => (
            <div key={spotIndex} className="aspect-square">
              {renderSpot(spot, spotIndex)}
            </div>
          ))}
        </div>
      </div>
      
      {renderSpotDetails()}
    </div>
  )
}

export default ParkingGrid