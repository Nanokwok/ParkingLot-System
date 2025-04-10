import { ParkingSpot } from './ParkingSpot';
import { VehicleSize } from '../types/vehicleSize';
import { Vehicle } from './Vehicle';

class Level {
  public floor: number = 0;
  public spots: ParkingSpot[] = [];
  public availableSpots: number = 0;
  private static readonly SPOTS_PER_ROW: number = 10;

  constructor(floor: number, numberSpots: number) {
    this.floor = floor;

    const largeSpots = numberSpots / 4;
    const motorcycleSpots = numberSpots / 4;
    const compactSpots = numberSpots - largeSpots - motorcycleSpots;

    for (let i = 0; i < numberSpots; i++) {
      let sz: VehicleSize = VehicleSize.Motorcycle;

      if (i < largeSpots) {
        sz = VehicleSize.Large;
      } else if (i < largeSpots + compactSpots) {
        sz = VehicleSize.Compact;
      }

      const row = Math.floor(i / Level.SPOTS_PER_ROW);
      this.spots.push(new ParkingSpot(this, row, i, sz));
    }

    this.availableSpots = numberSpots;
  }

  public avaiableSpots(): number {
    return this.availableSpots;
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    // console.log("Parking vehicle 2: ", vehicle.print());
    if (this.availableSpots < vehicle.getSpotNeeded()) {
      return false;
    }
    let spotNumber = this.findAvailableSpots(vehicle);
    // console.log("Spot number: ", spotNumber);
    if (spotNumber < 0) {
      return false;
    }

    return this.parkStartingAtSpot(spotNumber, vehicle);
  }

  private parkStartingAtSpot(spotNumber: number, vehicle: Vehicle): boolean {
    vehicle.clearSpot();
    let success = true;

    for (let i = spotNumber; i < spotNumber + vehicle.getSpotNeeded(); i++) {
      success = success && this.spots[i].park(vehicle);
    }

    this.availableSpots -= vehicle.getSpotNeeded();
    return success;
  }

  private findAvailableSpots(vehicle: Vehicle): number {
    const spotsNeeded = vehicle.getSpotNeeded();
    let spotsFound = 0;

    for (let i = 0; i < this.spots.length; i++) {
      const spot = this.spots[i];

      if (spot.canFitVehicle(vehicle)) {
        spotsFound++;
      } else {
        spotsFound = 0;
      }

      if (spotsFound === spotsNeeded) {
        return i - (spotsNeeded - 1);
      }
    }

    return -1;
  }

  public spotFreed(): void {
    this.availableSpots++;
  }

  public toJSON() {
    return {
      floor: this.floor,
      spots: this.spots.map((spot) => spot.toJSON()),
      availableSpots: this.availableSpots
    };
  }

  public print(): string[] {
    let output: string[] = [];
    let lastRow = -1;

    this.spots.forEach((spot) => {
      if (spot.getRow() !== lastRow) {
        lastRow = spot.getRow();
      }
      output.push(spot.print());
    });

    return output;
  }
}

export { Level };
