import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  campaignAddress: { type: String, required: true },
  userAddress: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
