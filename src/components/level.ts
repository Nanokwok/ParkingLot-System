import { ParkingSpot } from "./parkingSpot";
import { VehicleSize } from '../types/vehicleSize';
import { Vehicle } from './vehicle';

class Level {
  private floor: number = 0;
  private spots: ParkingSpot[] = [];
  private availableSpots: number = 0;
  private static readonly SPOTS_PER_ROW: number = 10;

  public Level(flr: number, numberSpots: number) {
    this.floor = flr;
    this.spots = new Array<ParkingSpot>(numberSpots);

    let largeSpots = numberSpots / 4;
    let motorcycleSpots = numberSpots / 4;
    let compactSpots = numberSpots - largeSpots - motorcycleSpots;

    for (let i = 0; i < numberSpots; i++) {
      let sz: VehicleSize = VehicleSize.Motorcycle;
      if (i < largeSpots) {
        sz = VehicleSize.Large;
      } else if (i < largeSpots + compactSpots) {
        sz = VehicleSize.Compact;
      }
      let row = i / Level.SPOTS_PER_ROW;
      // this.spots[i] = new ParkingSpot(this, row, i, sz);
    }
    this.availableSpots = numberSpots;
  }

  public avaiableSpots(): number {
    return this.availableSpots;
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    if (this.availableSpots < vehicle.getSpotNeeded()) {
      return false;
    }
    // logic
    return false;
  }

  private parkStartingAtSpot(spotNumber: number, vehicle: Vehicle): boolean {
    vehicle.clearSpot();
    let success = true;
    // logic
    return success;
  }

  private findAvailableSpots(vehicle: Vehicle): number {
    let spotNeeded: number = vehicle.getSpotNeeded();
    let lastRow = -1;
    let spotsFound = 0;
    // logic
    return -1;
  }

  public print(): void {
    let lastRow = -1;
    // logic
  }

  public spotFreed(): void {
    this.availableSpots++;
  }

}

export { Level };