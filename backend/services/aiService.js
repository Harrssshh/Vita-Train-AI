import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateAIPlan = async (data) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,

      messages: [
        {
          role: "system",
          content: `
You are a certified fitness trainer and nutritionist AI.

STRICT RULES:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- Follow EXACT JSON structure below.
- Always respect diet preference.
- Ensure calorie totals approximately match meals.

JSON STRUCTURE:

{
  "summary": {
    "age": number,
    "weight": number,
    "height": number,
    "goal": string,
    "experience": string,
    "daysPerWeek": number,
    "bmi": number,
    "bmr": number,
    "tdee": number
  },
  "dietPlan": {
    "calories": number,
    "macronutrients": {
      "protein": number,
      "carbohydrates": number,
      "fat": number
    },
    "mealPlan": {
      "breakfast": { "options": [] },
      "lunch": { "options": [] },
      "dinner": { "options": [] },
      "snacks": { "options": [] }
    }
  }
}

CALCULATION RULES:
- BMI = weight/(height in meters^2)
- BMR = Mifflin-St Jeor formula
- TDEE = BMR × activity factor (assume moderate activity if unknown)
- Adjust calories:
  muscle gain → surplus
  weight loss → deficit
`
        },

        {
          role: "user",
          content: `
Generate a precise personalized fitness diet plan.

USER DATA:
Age: ${data?.age}
Weight: ${data?.weight}
Height: ${data?.height}
Gender: ${data?.gender}
Goal: ${data?.goal}
Diet Preference: ${data?.dietPreference || "mixed"}
Experience: ${data?.experience || "beginner"}
Workout Days Per Week: ${data?.daysPerWeek || 4}
Workout Duration: ${data?.duration || 60}
Supplements Allowed: ${data?.supplements || "none"}
Food Restrictions: ${data?.foodRestrictions || "none"}

IMPORTANT CONDITIONS:

1. If dietPreference = "veg":
   - DO NOT include eggs, chicken, fish, meat.
   - Use paneer, tofu, soy, lentils, beans, dairy.

2. If supplements include "whey" or "all":
   - MUST include whey protein shake.
   - Include post-workout whey if goal is muscle gain.

3. If supplements = "none":
   - DO NOT include supplements.

4. Ensure:
   - Protein target met.
   - Calories from meals ≈ daily calories.
   - Balanced macros.

5. Include realistic Indian-style foods when possible.
`
        }
      ],
    });

    let raw = completion.choices[0].message.content;

    console.log("RAW AI:", raw);

    // remove accidental markdown formatting
    raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(raw);

    console.log("PARSED PLAN:", parsed);

    return parsed;

  } catch (err) {
    console.error("AI ERROR:", err);
    throw new Error("AI generation failed");
  }
};