import { ParkingSpot } from './parkingSpot';
import { VehicleSize } from '../types/vehicleSize';
import { Vehicle } from './vehicle';

class Level {
  private floor: number = 0;
  private spots: ParkingSpot[] = [];
  private availableSpots: number = 0;
  private static readonly SPOTS_PER_ROW: number = 10;

  constructor( floor: number, numberSpots: number ) {
    this.Level( floor, numberSpots );
  }

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
      this.spots[i] = new ParkingSpot(this, row, i, sz);
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
    let spotNumber = this.findAvailableSpots(vehicle);
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
    let spotNeeded: number = vehicle.getSpotNeeded();
    let lastRow = -1;
    let spotsFound = 0;
    for (let i = 0; i < this.spots.length; i++) {
      let spot: ParkingSpot = this.spots[i];
      if (lastRow !== spot.getRow()) {
        spotsFound = 0;
        lastRow = spot.getRow();
      }
      if (spot.canFitVehicle(vehicle)) {
        spotsFound++;
      } else {
        spotsFound = 0;
      }
      if (spotsFound === spotNeeded) {
        return i - (spotNeeded - 1);
      }
    }
    return -1;
  }

  public print(): void {
    let lastRow = -1;
    for (let i = 0; i < this.spots.length; i++) {
      let spot: ParkingSpot = this.spots[i];
      if (spot.getRow() !== lastRow) {
        console.log(' ');
        lastRow = spot.getRow();
      }
      spot.print();
    }
  }

  public spotFreed(): void {
    this.availableSpots++;
  }

}

export { Level };