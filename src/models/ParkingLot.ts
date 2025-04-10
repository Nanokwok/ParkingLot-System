import type { Level } from "./Level"
import type { Vehicle } from "./Vehicle"

class ParkingLot {
  private readonly levels: Level[]

  constructor(levels: Level[]) {
    this.levels = levels
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    for (const level of this.levels) {
      if (level.parkVehicle(vehicle)) return true
    }
    return false
  }

  public getLevels(): Level[] {
    return [...this.levels]
  }

  public removeVehicle(levelIndex: number, spotIndex: number): boolean {
    if (levelIndex < 0 || levelIndex >= this.levels.length) {
      return false
    }

    const level = this.levels[levelIndex]
    if (spotIndex < 0 || spotIndex >= level.spots.length) {
      return false
    }

    const spot = level.spots[spotIndex]
    if (spot.vehicle) {
      spot.vehicle.clearSpot()
      return true
    }

    return false
  }

  public toJSON() {
    return {
      levels: this.levels.map((level) => level.toJSON()),
    }
  }
}

export { ParkingLot }
