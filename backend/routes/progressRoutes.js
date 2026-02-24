import express from "express";
import { saveProgress } from "../controllers/progressController.js";

const router = express.Router();

router.post("/save", saveProgress);

export default router;