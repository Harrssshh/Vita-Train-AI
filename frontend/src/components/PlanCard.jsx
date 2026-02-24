import { Calendar, Target, Weight } from "lucide-react";

const PlanCard = ({ plan }) => {
  const date = new Date(plan?.createdAt || Date.now());

  // 🔥 FIX: Support both DB object and direct AI object
  const structuredPlan =
    plan?.plan && typeof plan.plan === "object"
      ? plan.plan
      : typeof plan === "object"
      ? plan
      : null;

  const summary = structuredPlan?.summary || {};
  const workoutDays = structuredPlan?.workoutDays || [];
  const dietPlan = structuredPlan?.dietPlan || {};

  const goalColors = {
    "muscle gain": "text-primary",
    "weight loss": "text-orange-400",
    endurance: "text-blue-400",
    flexibility: "text-purple-400",
  };

  return (
    <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group">

      {/* Date + Goal */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            goalColors[summary.goal] || "text-primary"
          }`}
        >
          {summary.goal || "AI Fitness Plan"}
        </span>
      </div>

      {/* Basic Info */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Target className="h-3.5 w-3.5" />
          Age: {summary.age || "--"}
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Weight className="h-3.5 w-3.5" />
          {summary.weight || "--"} kg
        </div>
      </div>

      {/* Summary */}
      {structuredPlan ? (
        <div className="bg-secondary/50 rounded-lg p-4 text-sm space-y-1">
          <p>BMI: {summary.bmi || "--"}</p>
          <p>Calories: {dietPlan?.macros?.calories || "--"} kcal</p>
          <p>Protein: {dietPlan?.macros?.protein || "--"}</p>
          <p>Workout Days: {workoutDays.length}</p>
          <p>Meals: {dietPlan?.meals?.length || 0}</p>
        </div>
      ) : (
        <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
          No structured plan available
        </div>
      )}
    </div>
  );
};

export default PlanCard;