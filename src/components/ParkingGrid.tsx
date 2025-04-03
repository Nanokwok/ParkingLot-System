import React from "react";
import { Level } from "@/pages/api/level";

interface ParkingGridProps {
  levels: Array<Level>;
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ levels }) => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        Parking Lot
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Loop through levels */}
        {levels.map((level, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-medium text-gray-700">
              Level {index + 1}
            </h3>

            {/* Loop through spots per level */}
            <div className="grid grid-cols-3 gap-2">
              {level.print().map((spot, spotIndex) => {
                const color = ["🚌", "🚗", "🛵"].includes(spot)
                  ? "bg-green-300"
                  : "bg-gray-200";
                const size = ["🚌", "🚗", "🛵"].includes(spot)
                  ? "text-3xl"
                  : "text-sm";

                return (
                  <div
                    key={spotIndex}
                    className={`h-16 w-16 ${color} rounded-lg flex items-center justify-center text-gray-700 ${size} font-semibold`}
                  >
                    {spot}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParkingGrid;
