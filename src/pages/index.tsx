// pages/index.tsx
import React from 'react';
import { ParkingLot } from '@/components/parkingLot';
import Header from '@/components/page/Header';
import AddVehicle from '@/components/page/AddVehicle';
import ParkingGrid from '@/components/page/ParkingGrid';
import Footer from '@/components/page/Footer';

const Index: React.FC = () => {
  const parkingLot = new ParkingLot();

  const levels = parkingLot.getLevels();
  const spotsPerLevel = parkingLot.getIndexLevel();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between items-center">
      <Header />

      <AddVehicle />

      <ParkingGrid levels={levels} spotsPerLevel={spotsPerLevel} />

      <Footer />
    </div>
  );
};

export default Index;
