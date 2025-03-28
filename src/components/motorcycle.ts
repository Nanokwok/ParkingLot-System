import { Vehicle } from "./vehicle";
import { VehicleSize } from "../types/vehicleSize";
import { ParkingSpot } from "./parkingSpot";

class Motorcycle extends Vehicle {
  public Motorcycle() {
    this.spotNeeded = 1;
    this.vehicleSize = VehicleSize.Motorcycle;
  }

  public canFitInSpot( spot: ParkingSpot ): boolean {
    return spot.getSize() === VehicleSize.Motorcycle;
  }

  public print(): string {
    return 'Motorcycle';
  }
}

export { Motorcycle };