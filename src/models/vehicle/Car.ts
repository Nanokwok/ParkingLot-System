import { Vehicle } from '../Vehicle';
import { VehicleSize } from '../../types/vehicleSize';
import { ParkingSpot } from '../ParkingSpot';

class Car extends Vehicle {
  constructor( licensePlate: string ) {
    super(licensePlate, 1, VehicleSize.Compact, []);
  }

  public canFitInSpot( spot: ParkingSpot ): boolean {
    return spot.getSize() === VehicleSize.Compact || spot.getSize() === VehicleSize.Large;
  }

  public print(): string {
    return '🚗';
  }
}

export { Car };