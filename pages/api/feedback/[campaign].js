import { connectToDatabase } from "../../../lib/mongoose";
import Feedback from "../../../models/Feedback";

export default async function handler(req, res) {
  const {
    query: { campaign },
  } = req;

  try {
    await connectToDatabase();
    const feedbacks = await Feedback.find({ campaignAddress: campaign }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error("Fetch Feedback Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
