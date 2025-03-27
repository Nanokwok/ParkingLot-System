import { Vehicle } from "./vehicle";
import { VehicleSize } from "../types/vehicleSize";

class Motorcycle extends Vehicle {
  public Motorcycle() {
    this.spotNeeded = 1;
    this.vehicleSize = VehicleSize.Motorcycle;
  }

  public canFitInSpot(): boolean {
    // logic
    return false;
  }

  public print(): void {
    console.log('Motorcycle');
  }
}

export { Motorcycle };