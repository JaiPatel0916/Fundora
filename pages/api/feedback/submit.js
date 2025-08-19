import { connectToDatabase } from "../../../lib/mongoose";
import Feedback from "../../../models/Feedback";

export const config = {
  api: {
    bodyParser: true, // Ensure bodyParser is enabled
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.log("❌ Invalid method");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    console.log("⚙️ Connecting to MongoDB...");
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    const body = req.body;

    console.log("📦 Raw body received:", body);

    const { campaignAddress, userAddress, message } = body;

    // Log each value to help debug
    console.log("➡️ campaignAddress:", campaignAddress);
    console.log("➡️ userAddress:", userAddress);
    console.log("➡️ message:", message);

    if (!campaignAddress || !userAddress || !message) {
      console.log("❗ Missing fields");
      return res.status(400).json({
        success: false,
        message: "Missing required fields: campaignAddress, userAddress, or message.",
      });
    }

    const newFeedback = await Feedback.create({
      campaignAddress,
      userAddress,
      message,
    });

    console.log("✅ Feedback saved:", newFeedback);

    return res.status(201).json({
      success: true,
      feedback: newFeedback.toObject(),
    });
  } catch (error) {
    console.error("❌ Server error during feedback submission:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
