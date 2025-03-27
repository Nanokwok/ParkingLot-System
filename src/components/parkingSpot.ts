import { VehicleSize } from '@/types/vehicleSize';
import { Vehicle } from './vehicle';

class ParkingSpot {
  private vehicle: Vehicle | null = null;
  private spotSize: VehicleSize | null = null;
  // private row: number;
  // private spotNumber: number;
  // level

  public ParkingSpot(r: number, n: number, sz: VehicleSize) {
    // level
    // this.row = r;
    // this.spotNumber = n;
    // this.spotSize = sz;
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

  public removeVehicle(): void {
    // choose level
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