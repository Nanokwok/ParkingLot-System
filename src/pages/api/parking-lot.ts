import { NextApiRequest, NextApiResponse } from 'next';
import { ParkingLotModel } from '../../../lib/models/ParkingLot';
import dbConnect from '../../../lib/mongodb';

class ParkingLotHandler {
  private static instance: ParkingLotHandler;

  private constructor() {}

  public static getInstance(): ParkingLotHandler {
    if (!ParkingLotHandler.instance) {
      ParkingLotHandler.instance = new ParkingLotHandler();
    }
    return ParkingLotHandler.instance;
  }

  public async handleRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    await dbConnect();

    try {
      if (req.method === 'GET') {
        await this.handleGetRequest(req, res);
      } else if (req.method === 'POST') {
        await this.handlePostRequest(req, res);
      } else {
        res.status(405).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  private async handleGetRequest(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const parkingLot = await ParkingLotModel.findOne();
    if (parkingLot) {
      res.status(200).json(parkingLot.toObject());
    } else {
      res.status(200).json({ levels: [] });
    }
  }

  private async handlePostRequest(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { levels } = req.body;

    if (levels) {
      await ParkingLotModel.findOneAndUpdate(
        {}, 
        { levels },
        { upsert: true, new: true }
      );
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Levels data is required' });
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parkingLotHandler = ParkingLotHandler.getInstance();
  await parkingLotHandler.handleRequest(req, res);
}
