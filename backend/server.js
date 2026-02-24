import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import connectDB from "./config/db.js";
// import workoutRoutes from "./routes/workoutRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.get("/", (req, res) => {
  res.send("Vita-Train-AI Backend Running 🚀");
});

app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);
// app.use("/api", workoutRoutes);
app.use("/api/progress", progressRoutes);

app.listen(5000, () =>
  console.log("Server running on port 5000")
);