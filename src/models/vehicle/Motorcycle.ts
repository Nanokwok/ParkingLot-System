import { Vehicle } from "../Vehicle";
import { VehicleSize } from "../../types/vehicleSize";
import { ParkingSpot } from "../ParkingSpot";

class Motorcycle extends Vehicle {
  constructor( licenesePlate: string ) {
    super(licenesePlate, 1, VehicleSize.Motorcycle, []);
  }

  public canFitInSpot( spot: ParkingSpot ): boolean {
    return spot.getSize() === VehicleSize.Motorcycle;
  }

  public print(): string {
    return '🛵';
  }
}

export { Motorcycle };