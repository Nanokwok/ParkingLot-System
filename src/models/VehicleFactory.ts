import { Bus } from "./vehicle/Bus";
import { Car } from "./vehicle/Car";
import { Motorcycle } from "./vehicle/Motorcycle";
import { Vehicle } from "./Vehicle";

type VehicleTypeInfo = {
  class: new (license: string) => Vehicle;
  name: string;
};

export class VehicleFactory {
  private static readonly VEHICLE_TYPES: Record<string, VehicleTypeInfo> = {
    "🚌": { class: Bus, name: "Bus" },
    "🚗": { class: Car, name: "Car" },
    "🛵": { class: Motorcycle, name: "Motorcycle" }
  };

  static create(icon: string, license = ""): Vehicle | null {
    const type = this.VEHICLE_TYPES[icon as keyof typeof this.VEHICLE_TYPES];
    return type ? new type.class(license) : null;
  }

  static getNameFromVehicle(vehicle: Vehicle): string {
    for (const type of Object.values(this.VEHICLE_TYPES)) {
      if (vehicle instanceof type.class) return type.name;
    }
    return "Vehicle";
  }

  static getNameFromEmoji(icon: string): string {
    const type = this.VEHICLE_TYPES[icon as keyof typeof this.VEHICLE_TYPES];
    return type ? type.name : "Vehicle";
  }
}
