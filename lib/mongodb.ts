import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/parking-lot';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private conn: Mongoose | null = null;
  private connectionPromise: Promise<Mongoose> | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<Mongoose> {
    if (this.conn) {
      return this.conn;
    }

    if (!this.connectionPromise) {
      this.connectionPromise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        return mongoose;
      });
    }

    this.conn = await this.connectionPromise;
    return this.conn;
  }
}

async function dbConnect(): Promise<Mongoose> {
  const dbConnection = DatabaseConnection.getInstance();
  return await dbConnection.connect();
}

export default dbConnect;