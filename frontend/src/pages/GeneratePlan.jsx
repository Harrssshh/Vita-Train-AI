import { useState } from "react";
import Navbar from "../components/Navbar";
import WorkoutForm from "../components/WorkoutForm";
import { generatePlan } from "../services/aiService"; 
import { Sparkles, CheckCircle, Download, Utensils, Droplets, Calendar } from "lucide-react";
import { jsPDF } from "jspdf";

const GeneratePlan = () => {
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("diet");


 const handleGenerate = async (params) => {
    setLoading(true);
    try {
      const res = await generatePlan(params);
      const aiPlan = res?.plan || res;

      const formattedPlan = {
        summary: {
          goal: aiPlan?.summary?.goal,
          experience: aiPlan?.summary?.experience,
          equipment: params?.equipment,
          bmi: aiPlan?.summary?.bmi,
          bmr: aiPlan?.summary?.bmr,
          tdee: aiPlan?.summary?.tdee,
          calories: aiPlan?.dietPlan?.calories,
          protein: aiPlan?.dietPlan?.macronutrients?.protein,
          carbs: aiPlan?.dietPlan?.macronutrients?.carbohydrates,
          fats: aiPlan?.dietPlan?.macronutrients?.fat,
          daysPerWeek: params?.daysPerWeek,
          duration: params?.duration,
        },

        dietPlan: {
          calories: aiPlan?.dietPlan?.calories,
          macronutrientBreakdown: aiPlan?.dietPlan?.macronutrients,
          meals: Object.entries(aiPlan?.dietPlan?.mealPlan || {}).flatMap(
            ([meal, data]) =>
              data.options.map(opt => ({
                meal,
                food: opt.name,
                calories: opt.calories,
                protein: opt.protein,
                carbohydrates: opt.carbohydrates,
                fat: opt.fat,
              }))
          ),
        },
      };

      setGeneratedPlan(formattedPlan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedPlan) return;
    const doc = new jsPDF();

    let y = 20;
    doc.setFontSize(18);
    doc.text("Vita-Train AI Plan", 20, y);

    y += 10;
    doc.setFontSize(10);

    Object.entries(generatedPlan.summary).forEach(([k, v]) => {
      doc.text(`${k}: ${v}`, 20, y);
      y += 6;
    });

    y += 10;
    doc.setFontSize(14);
    doc.text("Diet Plan", 20, y);

    y += 8;
    generatedPlan.dietPlan.meals.forEach(m => {
      doc.setFontSize(10);
      doc.text(`${m.meal}: ${m.food}`, 20, y);
      y += 5;
      doc.text(
        `Calories ${m.calories} | P ${m.protein}g | C ${m.carbohydrates}g | F ${m.fat}g`,
        25,
        y
      );
      y += 8;
    });

    doc.save("vita-train-plan.pdf");
  };
  
  const tabs = [
    { key: "diet", label: "Diet Plan", icon: Utensils },
    { key: "summary", label: "Summary", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            Generate AI Plan
          </h1>
          <p className="text-muted-foreground">Enter your details and let AI create a personalized workout & diet plan</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <WorkoutForm onSubmit={handleGenerate} loading={loading} />
          </div>

          <div>
            {generatedPlan ? (
              <div className="glass-card p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-display font-semibold text-foreground">Your AI Plan</h3>
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === tab.key
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="bg-secondary/50 rounded-lg p-5 max-h-[500px] overflow-y-auto">

                {activeTab === "workout" && generatedPlan?.workoutDays && (
  <div className="space-y-6">
    {generatedPlan.workoutDays.map((day, index) => (
      <div key={index} className="bg-background/50 p-4 rounded-lg">
        <h4 className="font-semibold text-primary mb-3">{day.day}</h4>
        <ul className="space-y-2">
          {day.exercises.map((ex, i) => (
            <li key={i}>
              {ex.name} — {ex.sets} sets x {ex.reps} reps
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}
    

                 {activeTab === "diet" && generatedPlan?.dietPlan && (
  <div className="space-y-6">

    {/* Calorie + Macros */}
    <div className="bg-background/50 p-4 rounded-lg space-y-2">
      <h4 className="text-md font-semibold">Daily Nutrition Target</h4>
      <p>Calories: {generatedPlan.dietPlan?.calories} kcal</p>
      <p>Protein: {generatedPlan.dietPlan.macronutrientBreakdown?.protein} g</p>
      <p>Carbs: {generatedPlan.dietPlan.macronutrientBreakdown?.carbohydrates} g</p>
      <p>Fats: {generatedPlan.dietPlan.macronutrientBreakdown?.fat} g</p>
    </div>

    {/* Full Meal Plan */}
    <div className="space-y-4">
      {(generatedPlan?.dietPlan?.meals || []).map((meal, index) => (
        <div key={index} className="bg-background/50 p-4 rounded-lg">
          <h4 className="font-semibold text-primary">{meal.meal}</h4>
          <p className="mt-1">{meal.food}</p>
          <div className="text-sm text-muted-foreground mt-2">
            Calories: {meal.calories} kcal | 
            Protein: {meal.protein} g | 
            Carbs: {meal.carbohydrates} g | 
            Fat: {meal.fat} g
          </div>
        </div>
      ))}
    </div>

  </div>
)}

                  {/* Summary Tab */}
                  {activeTab === "summary" && (
  <div className="space-y-3">
    {[
      { label: "Goal", value: generatedPlan?.summary?.goal || "--" },
      { label: "Experience", value: generatedPlan?.summary?.experience || "--" },
      { label: "Equipment", value: generatedPlan?.summary?.equipment || "--" },
      { label: "BMI", value: generatedPlan?.summary?.bmi || "--" },
      { label: "BMR", value: `${generatedPlan?.summary?.bmr || "--"} kcal` },
      { label: "TDEE", value: `${generatedPlan?.summary?.tdee || "--"} kcal` },
      { label: "Target Calories", value: `${generatedPlan?.summary?.calories || "--"} kcal` },
      {
        label: "Schedule",
        value: `${generatedPlan?.summary?.daysPerWeek || "--"} days/week, ${generatedPlan?.summary?.duration || "--"} min sessions`,
      },
    ].map((row) => (
      <div key={row.label} className="flex justify-between py-2 border-b border-border/30">
        <span className="text-sm text-muted-foreground">{row.label}</span>
        <span className="text-sm font-medium text-foreground">{row.value}</span>
      </div>
    ))}
  </div>
)}

                </div>
              </div>
            ) : (
              <div className="glass-card p-12 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <Sparkles className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  Fill in the form and hit Generate to see your personalized AI plan here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeneratePlan;