import mongoose, { Schema, Document, Model } from 'mongoose';

interface IParkingSpot extends Document {
  spotSize: string;
  row: number;
  spotNumber: number;
  vehicle: string | null;
}

interface ILevel extends Document {
  floor: number;
  spots: IParkingSpot[];
  availableSpots: number;
}

interface IParkingLot extends Document {
  levels: ILevel[];
}

const ParkingSpotSchema: Schema = new Schema({
  spotSize: { type: String, enum: ['Motorcycle', 'Compact', 'Large'], required: true },
  row: { type: Number, required: true },
  spotNumber: { type: Number, required: true },
  vehicle: { type: String, default: null }
});

const LevelSchema: Schema = new Schema({
  floor: { type: Number, required: true },
  spots: [ParkingSpotSchema],
  availableSpots: { type: Number, required: true }
});

const ParkingLotSchema: Schema = new Schema({
  levels: [LevelSchema]
});

let ParkingLotModel: Model<IParkingLot>;

try {
  ParkingLotModel = mongoose.model<IParkingLot>('ParkingLot');
} catch {
  ParkingLotModel = mongoose.model<IParkingLot>('ParkingLot', ParkingLotSchema);
}

export { ParkingLotModel };