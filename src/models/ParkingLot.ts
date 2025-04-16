import { Level } from "./Level";
import { Vehicle } from "./Vehicle";
import { VehicleFactory } from "./VehicleFactory";

class ParkingLot {
  private readonly levels: Level[];
  public static readonly NUM_LEVELS = 3;
  public static readonly SPOTS_PER_LEVEL = 30;

  constructor(levels: Level[]) {
    this.levels = levels;
  }

  public static createDefault(): ParkingLot {
    const levels = Array.from({ length: ParkingLot.NUM_LEVELS }, (_, i) =>
      new Level(i, ParkingLot.SPOTS_PER_LEVEL)
    );
    return new ParkingLot(levels);
  }

  public static async load(): Promise<ParkingLot> {
    try {
      const res = await fetch("/api/parking-lot");
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();

      if (data.levels?.length) {
        const loadedLevels = data.levels.map((lvl: any) => {
          const level = new Level(lvl.floor, lvl.spots.length);

          lvl.spots.forEach((spot: any, i: number) => {
            if (spot.vehicle) {
              level.spots[i].vehicle = VehicleFactory.create(
                spot.vehicle,
                spot.licensePlate || ""
              );
            }
          });

          level.availableSpots = lvl.availableSpots;
          return level;
        });

        return new ParkingLot(loadedLevels);
      }
    } catch (err) {
      console.error("Fail to load:", err);
    }

    const parkingLot = ParkingLot.createDefault();
    await parkingLot.save();
    return parkingLot;
  }

  public async save(): Promise<void> {
    try {
      const res = await fetch("/api/parking-lot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.toJSON()),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Server save failed");
    } catch (err) {
      console.error("Fail to save:", err);
      throw err;
    }
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    return this.levels.some((level) => level.parkVehicle(vehicle));
  }

  public getLevels(): Level[] {
    return [...this.levels];
  }

  public removeVehicle(levelIndex: number, spotIndex: number): boolean {
    const level = this.levels[levelIndex];
    const spot = level?.spots?.[spotIndex];

    if (spot?.vehicle) {
      spot.vehicle.clearSpot();
      return true;
    }
    return false;
  }

  public toJSON() {
    return {
      levels: this.levels.map((level) => level.toJSON()),
    };
  }
}

export { ParkingLot };
