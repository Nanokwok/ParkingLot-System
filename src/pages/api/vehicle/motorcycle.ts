import { Vehicle } from "../vehicle";
import { VehicleSize } from "../../../types/vehicleSize";
import { ParkingSpot } from "../parkingSpot";

class Motorcycle extends Vehicle {
  constructor() {
    super('', 1, VehicleSize.Motorcycle, []);
  }

  public canFitInSpot( spot: ParkingSpot ): boolean {
    return spot.getSize() === VehicleSize.Motorcycle || spot.getSize() === VehicleSize.Compact;
  }

  public print(): string {
    return '🛵';
  }
}

export { Motorcycle };