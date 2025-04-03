// import { NextResponse } from "next/server";
// import { connectToDB } from "../../../lib/mongodb";
// import Level from "../../models/Level";

// export async function POST(req: Request) {
//   console.log("🛠 API POST route hit!");

//   try {
//     // Connect to MongoDB
//     console.log("🔄 Connecting to MongoDB...");
//     await connectToDB();

//     // Default parking spots data (you can customize it)
//     const defaultSpots = Array.from({ length: 30 }, (_, i) => ({
//       vehicle: null, // Initially empty
//       spotSize: i < 10 ? "Large" : i < 20 ? "Compact" : "Motorcycle", // Example of variety in spot sizes
//       row: Math.floor(i / 10), // Simple row assignment
//       spotNumber: i,
//     }));

//     // Default levels data (you can customize the number of levels)
//     const defaultLevels = Array.from({ length: 10 }, (_, i) => ({
//       floor: i,
//       spots: defaultSpots,
//     }));

//     // Create Level documents in MongoDB
//     const levels = await Level.insertMany(defaultLevels);
//     console.log("📝 Levels Saved:", levels);

//     return NextResponse.json(
//       { message: "Levels created", levels },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Error saving levels:", error);
//     return NextResponse.json({ error: "Error saving levels" }, { status: 500 });
//   }
// }

// src/pages/api/levels.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDB } from "../../../lib/mongodb"; // Adjust path as necessary
// import Level from "../../models/Level"; // Adjust path as necessary

// // Default export for handling the API request
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Handle POST request to create/update levels
//     if (req.method === "POST") {
//       await connectToDB();
//       const levelsData = req.body; // Get levels data from request body

//       // Assuming you save it to a database here
//       const savedLevels = await Level.create(levelsData);
//       res.status(201).json({ levels: savedLevels });
//     } else {
//       // Handle GET request to fetch levels
//       const levels = await Level.find({});
//       res.status(200).json({ levels });
//     }
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// export async function POST(req: Request) {
//   console.log("🛠 API POST route hit!");
//   try {
//     console.log("🔄 Connecting to MongoDB...");
//     await connectToDB();

//     const { name, email } = await req.json();
//     console.log("📩 Received Data:", { name, email });

//     const newUser = new Level({ name, email });
//     console.log("📝 User Before Saving:", newUser);

//     await newUser.save();

//     return NextResponse.json(
//       { message: "User created", user: newUser },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Error saving user:", error);
//     return NextResponse.json({ error: "Error saving user" }, { status: 500 });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../../lib/mongodb"; // Adjust the import if necessary
import Level from "@/models/Level";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      console.log("🔄 Connecting to MongoDB...");
      await connectToDB();

      const { floor, spots } = req.body;
      console.log("📩 Received Level Data:", { floor, spots });

      if (!floor || !spots) {
        throw new Error("Missing required fields: floor or spots.");
      }

      const newLevel = new Level({ floor, spots });
      console.log("📝 Level Before Saving:", newLevel);

      await newLevel.save();
      console.log("✅ Level saved successfully");

      res.status(201).json({ message: "Level created", level: newLevel });
    } catch (error) {
      console.error("❌ Error saving level:", error);
      res.status(500).json({ error: error || "Error saving level" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}


