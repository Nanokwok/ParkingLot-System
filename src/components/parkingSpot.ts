import { VehicleSize } from '@/types/vehicleSize';
import { Vehicle } from './vehicle';
import { Level } from './level';

class ParkingSpot {
  public vehicle: Vehicle | null = null;
  public spotSize: VehicleSize = VehicleSize.Compact;
  public row: number = 0;
  public spotNumber: number = 0;
  public level: Level = new Level(0, 0);

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

  public toJSON() {
    return {
      spotSize: this.spotSize,
      row: this.row,
      spotNumber: this.spotNumber,
      vehicle: this.vehicle ? this.vehicle.print() : null
    };
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