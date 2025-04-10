import { NextApiRequest, NextApiResponse } from 'next';
import { ParkingLotModel} from '../../../lib/models/ParkingLot';
import dbConnect from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method === 'GET') {
      const parkingLot = await ParkingLotModel.findOne();
      res.status(200).json(parkingLot ? parkingLot.toObject() : { levels: [] });
    } else if (req.method === 'POST') {
      await ParkingLotModel.findOneAndUpdate(
        {}, 
        { levels: req.body.levels },
        { upsert: true, new: true }
      );
      res.status(200).json({ success: true });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}