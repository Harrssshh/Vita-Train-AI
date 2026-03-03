import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

/* ================================
   CORS Configuration
================================ */

// Allow your frontend domain in production
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "http://localhost:3000",
  "https://vita-train-ai.vercel.app" // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

/* ================================
   Routes
================================ */

app.get("/", (req, res) => {
  res.send("Vita-Train-AI Backend Running 🚀");
});

app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);

/* ================================
   Server Listen (Render Safe)
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});