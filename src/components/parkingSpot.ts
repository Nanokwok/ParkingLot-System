import { VehicleSize } from '@/types/vehicleSize';
import { Vehicle } from './vehicle';
import { Level } from './level';

class ParkingSpot {
  private vehicle: Vehicle | null = null;
  private spotSize: VehicleSize = VehicleSize.Compact;
  private row: number = 0;
  private spotNumber: number = 0;
  private level: Level = new Level(0, 0);

  constructor(lvl: Level, r: number, n: number, sz: VehicleSize) {
    this.level = lvl;
    this.row = r;
    this.spotNumber = n;
    this.spotSize = sz;
  }

  public isAvailable(): boolean {
    return this.vehicle === null;
  }

  public canFitVehicle(vehicle: Vehicle): boolean {
    return this.isAvailable() && vehicle.canFitInSpot(this);
  }

  public park(vehicle: Vehicle): boolean {
    if (!this.canFitVehicle(vehicle)) {
      return false;
    }
    console.log('this.park, vehicle 1', this.vehicle, vehicle);
    this.vehicle = vehicle;
    console.log('this.park, vehicle 2', this.vehicle, vehicle);
    this.vehicle.parkInSpot(this);
    return true;
  }

  public getRow(): number {
    return this.row;
  }

  public getSpotNumber(): number {
    return this.spotNumber;
  }

  public getSize(): VehicleSize {
    return this.spotSize;
  }

  public removeVehicle(): void {
    this.level.spotFreed();
    this.vehicle = null;
  }

  public print(): string {
    console.log('print', this.vehicle);
    if (this.vehicle === null) {
      if (this.spotSize === VehicleSize.Compact) {
        return 'compact';
      }
      if (this.spotSize === VehicleSize.Large) {
        return 'large';
      }
      if (this.spotSize === VehicleSize.Motorcycle) {
        return 'motor';
      }
    }
    return this.vehicle!.print();
  }

}

export { ParkingSpot };