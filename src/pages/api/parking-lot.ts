import { NextApiRequest, NextApiResponse } from 'next';
import { ParkingLotModel } from '../../../lib/models/ParkingLot';
import dbConnect from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method === 'GET') {
      const parkingLot = await ParkingLotModel.findOne();
      if (parkingLot) {
        res.status(200).json(parkingLot.toObject());
      } else {
        res.status(200).json({ levels: [] });
      }
    } else if (req.method === 'POST') {
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
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
