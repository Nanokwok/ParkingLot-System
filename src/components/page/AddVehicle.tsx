import React from 'react';

const AddVehicle: React.FC = () => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-5">Add a Vehicle</h2>

      <div className="flex justify-center space-x-6">
        <button className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
          Add a Bus
        </button>
        <button className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
          Add a Car
        </button>
        <button className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
          Add a Motorcycle
        </button>
      </div>
    </section>
  );
};

export default AddVehicle;
