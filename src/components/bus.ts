import { Vehicle } from './vehicle';
import { VehicleSize } from '../types/vehicleSize';
import { ParkingSpot } from './parkingSpot';

class Bus extends Vehicle {
  constructor( licencePlate: string ) {
    super(licencePlate, 5, VehicleSize.Large, []);
  }

  public canFitInSpot(spot: ParkingSpot): boolean {
    return spot.getSize() === VehicleSize.Large;
  }

  public print(): string {
    return '🚌';
  }

}

export { Bus };