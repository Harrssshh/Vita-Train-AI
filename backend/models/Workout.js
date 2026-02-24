import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: String,

  day: String,
  focus: String,
  exercises: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Workout", workoutSchema);