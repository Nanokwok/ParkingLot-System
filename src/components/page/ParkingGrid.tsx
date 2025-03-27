import React from 'react';

interface ParkingGridProps {
  levels: number;
  spotsPerLevel: number;
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ levels, spotsPerLevel }) => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Parking Lot</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Loop through levels */}
        {[...Array(levels)].map((_, levelIndex) => (
          <div key={levelIndex} className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Level {levelIndex + 1}</h3>

            {/* Loop through spots per level */}
            <div className="grid grid-cols-3 gap-2">
              {[...Array(spotsPerLevel)].map((_, spotIndex) => {
                let spotType = "bg-gray-200";
                let spotLabel = "Compact";

                if (spotIndex < 5) {
                  spotType = "bg-gray-300";
                  spotLabel = "Large";
                } else if (spotIndex >= spotsPerLevel - 5) {
                  spotType = "bg-gray-100";
                  spotLabel = "Motor";
                }

                return (
                  <div
                    key={spotIndex}
                    className={`h-16 w-16 ${spotType} rounded-lg flex items-center justify-center text-gray-700 text-sm font-semibold`}
                  >
                    {spotLabel}
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
