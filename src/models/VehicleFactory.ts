import { Bus } from "./vehicle/Bus";
import { Car } from "./vehicle/Car";
import { Motorcycle } from "./vehicle/Motorcycle";
import { Vehicle } from "./Vehicle";

const VEHICLE_TYPES = {
  "🚌": { class: Bus, name: "Bus" },
  "🚗": { class: Car, name: "Car" },
  "🛵": { class: Motorcycle, name: "Motorcycle" }
};

export const VehicleFactory = {
  create(icon: string, license = ""): Vehicle | null {
    const type = VEHICLE_TYPES[icon as keyof typeof VEHICLE_TYPES];
    return type ? new type.class(license) : null;
  },

  getNameFromVehicle(vehicle: Vehicle): string {
    for (const type of Object.values(VEHICLE_TYPES)) {
      if (vehicle instanceof type.class) return type.name;
    }
    return "Vehicle";
  },

  getNameFromEmoji(icon: string): string {
    const type = VEHICLE_TYPES[icon as keyof typeof VEHICLE_TYPES];
    return type ? type.name : "Vehicle";
  }
};
