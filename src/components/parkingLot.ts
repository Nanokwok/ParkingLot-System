import { Level } from './level';
import { Vehicle } from './vehicle';

class ParkingLot {
  private readonly NUM_LEVELS : number = 4;
  private readonly NUM_SPOTS_PER_LEVEL : number = 30;
  private levels: Level[] = [];

  constructor(lvl: Level[]) {
    this.levels = lvl;
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].parkVehicle(vehicle)) {
        return true;
      }
    }
    return false;
  }

  public getLevels(): Level[] {
    return this.levels;
  }

  public getIndexLevel(): number {
    return this.NUM_SPOTS_PER_LEVEL;
  }

}

export { ParkingLot };