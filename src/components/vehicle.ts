import { VehicleSize } from '../types/vehicleSize';
import { ParkingSpot } from './parkingSpot';

abstract class Vehicle {
  protected parkingSpots: Array<ParkingSpot> = new Array<ParkingSpot>();
  protected licensePlate: string = '';
  protected spotNeeded: number = 0;
  protected vehicleSize: VehicleSize = VehicleSize.Motorcycle;

  public getSpotNeeded(): number {
    return this.spotNeeded;
  }

  public VehicleSize(): VehicleSize {
    return this.vehicleSize;
  }

  public parkInSpot(spot: ParkingSpot): void {
    this.parkingSpots.push(spot);
  }

  public clearSpot(): void {
    for (let i = 0; i < this.parkingSpots.length; i++) {
      this.parkingSpots[i].removeVehicle();
    }
    this.parkingSpots.length = 0;
  }

  public abstract canFitInSpot(spot: ParkingSpot): boolean

  public abstract print(): void;

}

export { Vehicle };