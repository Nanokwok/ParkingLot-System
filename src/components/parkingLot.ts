import { Level } from './level';
import { Vehicle } from './vehicle';

class ParkingLot {
  // private levels : Array<Level> = new Array<Level>();
  private readonly NUM_LEVELS : number = 4;
  private readonly NUM_SPOTS_PER_LEVEL : number = 30;
  private levels: Level[] = [];

  constructor(lvl: Level[]) {
    this.levels = lvl;
  }

  public ParkingLot() {
    console.log("Create parking lot");
    // let levels = new Array<Level>(this.NUM_LEVELS);
    // for (let i = 0; i < this.NUM_LEVELS; i++) {
    //   levels[i] = new Level(i, this.NUM_SPOTS_PER_LEVEL);
    // }
    // this.levels = levels;
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    // console.log("Parking vehicle 1: ", vehicle.print());
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].parkVehicle(vehicle)) {
        return true;
      }
    }
    return false;
  }

  public handleParkVehicle = (vehicle: Vehicle) => {
    const success = this.parkVehicle(vehicle);
    console.log("success: ", success);
    if (!success) {
      alert('Parking lot is full!');
    }
  };

  public getLevels(): number {
    return this.NUM_LEVELS;
  }

  public getIndexLevel(): number {
    return this.NUM_SPOTS_PER_LEVEL;
  }

}

export { ParkingLot };