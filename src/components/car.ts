import { Vehicle } from './vehicle';
import { VehicleSize } from '../types/vehicleSize';
import { ParkingSpot } from './parkingSpot';

class Car extends Vehicle {
  public Car() {
    this.spotNeeded = 1;
    this.vehicleSize = VehicleSize.Compact;
  }

  public canFitInSpot( spot: ParkingSpot ): boolean {
    return spot.getSize() === VehicleSize.Compact;
  }

  public print(): string {
    return 'Car';
  }
}

export { Car };