import { VehicleSize } from '../types/vehicleSize';
import { ParkingSpot } from './parkingSpot';

abstract class Vehicle {
  protected parkingSpots: Array<ParkingSpot> = new Array<ParkingSpot>();
  protected licensePlate: string = '';
  protected spotNeeded: number = 0;
  protected vehicleSize: VehicleSize = VehicleSize.Motorcycle;

  constructor(licensePlate: string, spotNeeded: number, vehicleSize: VehicleSize, parkingSpots: Array<ParkingSpot>) {
    this.spotNeeded = spotNeeded;
    this.vehicleSize = vehicleSize;
    this.parkingSpots = parkingSpots;
    this.licensePlate = licensePlate;
  }

  public getLicensePlate(): string {
    return this.licensePlate
  }

  public setLicensePlate(licensePlate: string): void {
    this.licensePlate = licensePlate
  }

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

  public abstract print(): string;

}

export { Vehicle };