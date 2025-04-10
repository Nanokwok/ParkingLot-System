import { Level } from "@/models/Level";

interface ParkingStatisticsProps {
  levels: Level[];
}

const ParkingStatistics = ({ levels }: ParkingStatisticsProps) => {
  const getBarColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500";
    if (percentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">Parking Statistics</h2>
      </div>

      <div className="space-y-4">
        {levels.map((level, index) => {
          const occupancyPercentage =
            ((level.spots.length - level.availableSpots) / level.spots.length) *
            100;

          return (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3 transition-all hover:bg-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">
                  Level {index + 1}
                </span>
                <div className="flex items-center">
                  <span
                    className={`text-sm font-bold ${
                      level.availableSpots < 3
                        ? "text-red-600"
                        : level.availableSpots < 10
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {level.availableSpots}
                  </span>
                  <span className="text-sm text-gray-600 mx-1">/</span>
                  <span className="text-sm text-gray-600">
                    {level.spots.length}
                  </span>
                  <span className="text-sm ml-1 text-gray-600">available</span>
                </div>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getBarColor(
                    occupancyPercentage
                  )}`}
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
  );
};

export default ParkingStatistics;
