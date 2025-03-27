import { Vehicle } from './vehicle';
import { VehicleSize } from '../types/vehicleSize';

class Bus extends Vehicle {
  public Bus() {
    this.spotNeeded = 5;
    this.vehicleSize = VehicleSize.Large;
  }

  public print(): void {
    console.log('Bus');
  }
}

export { Bus };