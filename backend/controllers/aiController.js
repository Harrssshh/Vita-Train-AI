import { generateAIPlan } from "../services/aiService.js";

export const generatePlan = async (req, res) => {
  try {
    // 🧠 Get structured JSON from AI
    const aiPlan = await generateAIPlan(req.body);

    if (!aiPlan) {
      return res.status(400).json({ message: "No AI plan generated" });
    }

  

    res.json({
      message: "AI plan generated & saved ✅",
      plan: aiPlan,
    });

  } catch (err) {
    console.error("AI Controller Error:", err);
    res.status(500).json({ message: "AI generation failed" });
  }
};

