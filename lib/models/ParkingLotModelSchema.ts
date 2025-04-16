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

class ParkingLotModelSchema {
  private static instance: ParkingLotModelSchema;
  private model: Model<IParkingLot>;

  private constructor() {
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

    try {
      this.model = mongoose.model<IParkingLot>('ParkingLot');
    } catch {
      this.model = mongoose.model<IParkingLot>('ParkingLot', ParkingLotSchema);
    }
  }

  public static getInstance(): ParkingLotModelSchema {
    if (!ParkingLotModelSchema.instance) {
      ParkingLotModelSchema.instance = new ParkingLotModelSchema();
    }
    return ParkingLotModelSchema.instance;
  }

  public getModel(): Model<IParkingLot> {
    return this.model;
  }
}

const ParkingLotModel = ParkingLotModelSchema.getInstance().getModel();

export { ParkingLotModel };