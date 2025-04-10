"use client"

import type React from "react"
import { useState } from "react"
import type { ParkingLot } from "../parkingLot"
import { Bus } from "../bus"
import { Car } from "../car"
import { Motorcycle } from "../motorcycle"
import type { Vehicle } from "../vehicle"

interface AddVehicleProps {
  parkingLotObject: InstanceType<typeof ParkingLot>
  onPark: (vehicle: Vehicle) => void
}

const AddVehicle: React.FC<AddVehicleProps> = ({ parkingLotObject, onPark }) => {
  const [licensePlate, setLicensePlate] = useState("")
  const [vehicleType, setVehicleType] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")

  const handleLicensePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicensePlate(e.target.value)
    setError("")
  }

  const handleVehicleSelect = (type: string) => {
    setVehicleType(type)
    setStep(2)
  }

  const validateLicensePlate = (plate: string): boolean => {
    if (plate.trim().length < 2) {
      setError("License plate must be at least 2 characters")
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!vehicleType) return

    if (!validateLicensePlate(licensePlate)) {
      return
    }

    let vehicle: Vehicle

    switch (vehicleType) {
      case "bus":
        vehicle = new Bus(licensePlate)
        break
      case "car":
        vehicle = new Car(licensePlate)
        break
      case "motorcycle":
        vehicle = new Motorcycle(licensePlate)
        break
      default:
        return
    }

    onPark(vehicle)
    resetForm()
  }

  const resetForm = () => {
    setLicensePlate("")
    setVehicleType(null)
    setStep(1)
    setError("")
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add a Vehicle
        </h2>
        {step === 2 && (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">Step 2 of 2</span>
        )}
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <p className="text-sm text-gray-600">Select the type of vehicle you want to park:</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all group"
              onClick={() => handleVehicleSelect("bus")}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🚌</div>
              <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">Bus</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all group"
              onClick={() => handleVehicleSelect("car")}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🚗</div>
              <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">Car</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all group"
              onClick={() => handleVehicleSelect("motorcycle")}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🛵</div>
              <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">Motorcycle</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mr-4 border border-blue-200">
                <span className="text-2xl">{vehicleType === "bus" ? "🚌" : vehicleType === "car" ? "🚗" : "🛵"}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {vehicleType === "bus" ? "Bus" : vehicleType === "car" ? "Car" : "Motorcycle"} Details
                </h3>
                <p className="text-sm text-gray-600">Enter the license plate information below</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">License Plate</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                type="text"
                value={licensePlate}
                onChange={handleLicensePlateChange}
                className={`w-full pl-10 pr-3 py-3 border ${
                  error ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400`}
                placeholder="Enter license plate"
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center mt-2 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              type="submit"
              className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Park Vehicle
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </form>
      )}

      {step === 1 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-7 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>First select a vehicle type, then add license plate details.</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddVehicle