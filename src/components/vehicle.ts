import { VehicleSize } from '../types/vehicleSize';

abstract class Vehicle {
  protected vehicleSize: VehicleSize = VehicleSize.Motorcycle;
  protected licensePlate: string = '';
  protected spotNeeded: number = 0;

  public getSpotNeeded(): number {
    return this.spotNeeded;
  }

  public VehicleSize(): VehicleSize {
    return this.vehicleSize;
  }

  public parkInSpot(): void {
    // logic using parkingSpot
  }

  public clearSpot(): void {
    // logic using parkingSpot
  }

  public abstract canFitInSpot(): boolean;

  public abstract print(): void;

}

export { Vehicle };