import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { generatePlan } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-plan", verifyToken, generatePlan);

export default router;