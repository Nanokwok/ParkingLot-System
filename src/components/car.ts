import { Vehicle } from './vehicle';
import { VehicleSize } from '../types/vehicleSize';

class Car extends Vehicle {
  public Car() {
    this.spotNeeded = 1;
    this.vehicleSize = VehicleSize.Compact;
  }

  public canFitInSpot(): boolean {
    // logic
    return false;
  }

  public print(): void {
    console.log('Car');
  }
}

export { Car };