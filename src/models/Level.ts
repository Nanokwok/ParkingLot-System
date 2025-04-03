import mongoose, { Schema, Document } from "mongoose";

// Define ParkingSpot schema
const ParkingSpotSchema = new Schema({
  vehicle: { type: mongoose.Schema.Types.Mixed, default: null }, // Can store vehicle data
  spotSize: { type: String, required: true, enum: ["Large", "Compact", "Motorcycle"] },
  // row: { type: Number, required: true },
  spotNumber: { type: Number, required: true },
});

// Define Level schema
interface ILevel extends Document {
  floor: number;
  spots: typeof ParkingSpotSchema[];
}

const LevelSchema = new Schema<ILevel>({
  floor: { type: Number, required: true },
  spots: [ParkingSpotSchema], // Array of parking spots
});

const Level = mongoose.models.Level || mongoose.model<ILevel>("Level", LevelSchema);
export default Level;

// Export model
// export default mongoose.models.Level || mongoose.model<ILevel>("Level", LevelSchema);
