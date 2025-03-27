import { Vehicle } from './vehicle';
import { VehicleSize } from '../types/vehicleSize';
import { ParkingSpot } from './parkingSpot';

class Bus extends Vehicle {
  public Bus() {
    this.spotNeeded = 5;
    this.vehicleSize = VehicleSize.Large;
  }

  public canFitInSpot(spot: ParkingSpot): boolean {
    return spot.getSize() === VehicleSize.Large;
  }

  public print(): void {
    console.log('Bus');
  }

}

export { Bus };