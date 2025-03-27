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

  public ParkingSpot(lvl: Level, r: number, n: number, sz: VehicleSize) {
    this.level = lvl;
    this.row = r;
    this.spotNumber = n;
    this.spotSize = sz;
  }

  public isAvailable(): boolean {
    return this.vehicle === null;
  }

  public canFitVehicle(vehicle: Vehicle): boolean {
    // logic
    return false
  }

  public park(vehicle: Vehicle): boolean {
    // logic
    return false
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

  public print(): void {
    if (this.vehicle === null) {
      if (this.spotSize === VehicleSize.Compact) {
        console.log('compact');
      }
      if (this.spotSize === VehicleSize.Large) {
        console.log('large');
      }
      if (this.spotSize === VehicleSize.Motorcycle) {
        console.log('motorcycle');
      }
    }
    else {
      this.vehicle.print();
    }
  }

}

export { ParkingSpot };