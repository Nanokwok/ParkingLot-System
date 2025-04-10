import { ParkingLotModel } from "../lib/models/ParkingLot";
import { Level } from '@/components/level';
import dbConnect from '../lib/mongodb';

export class ParkingService {
  static async loadParkingLot(): Promise<Level[] | null> {
    try {
      await dbConnect();
      const parkingLot = await ParkingLotModel.findOne();
      if (!parkingLot) return null;

      return parkingLot.levels.map((levelDoc: any) => {
        const level = new Level(levelDoc.floor, levelDoc.spots.length);
        levelDoc.spots.forEach((spotDoc: any, index: number) => {
          level.spots[index].vehicle = spotDoc.vehicle;
        });
        level.availableSpots = levelDoc.availableSpots;
        return level;
      });
    } catch (error) {
      console.error('Error loading parking lot:', error);
      return null;
    }
  }

  static async initializeParkingLot(levels: Level[]): Promise<void> {
    try {
      await dbConnect();
      await ParkingLotModel.deleteMany({}); // Clear existing data

      const parkingLotData = {
        levels: levels.map(level => ({
          floor: level.floor,
          spots: level.spots.map(spot => ({
            spotSize: spot.getSize(),
            row: spot.getRow(),
            spotNumber: spot.getSpotNumber(),
            vehicle: spot.vehicle ? spot.vehicle.print() : null
          })),
          availableSpots: level.availableSpots
        }))
      };

      await ParkingLotModel.create(parkingLotData);
    } catch (error) {
      console.error('Error initializing parking lot:', error);
      throw error;
    }
  }

  static async updateParkingLot(levels: Level[]): Promise<void> {
    try {
      await dbConnect();
      const parkingLotData = {
        levels: levels.map(level => ({
          floor: level.floor,
          spots: level.spots.map(spot => ({
            spotSize: spot.getSize(),
            row: spot.getRow(),
            spotNumber: spot.getSpotNumber(),
            vehicle: spot.vehicle ? spot.vehicle.print() : null
          })),
          availableSpots: level.availableSpots
        }))
      };

      await ParkingLotModel.findOneAndUpdate({}, parkingLotData, { upsert: true });
    } catch (error) {
      console.error('Error updating parking lot:', error);
      throw error;
    }
  }
}