import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: String,
  weight: Number,
  goal: String,
  workoutCompleted: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Progress", progressSchema);