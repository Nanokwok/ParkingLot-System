import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDB();
    res.status(200).json({ message: "MongoDB Connected Successfully" });
  } catch (error) {
    res.status(500).json({ message: "MongoDB Connection Failed", error });
  }
}
