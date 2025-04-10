import { Vehicle } from './vehicle';
import { VehicleSize } from '../types/vehicleSize';
import { ParkingSpot } from './parkingSpot';

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