import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Sparkles, Dumbbell, Ruler, Weight, UserCircle, Target, Heart, Droplets, CalendarDays, Zap,Calculator, TrendingUp } from "lucide-react";

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen. 💪",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Discipline is choosing between what you want now and what you want most.",
  "Strive for progress, not perfection.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Success isn't always about greatness. It's about consistency.",
  "Don't limit your challenges. Challenge your limits.",
  "Wake up. Work out. Look hot. Kick ass.",
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dayFocus = ["Chest & Triceps", "Back & Biceps", "Legs & Glutes", "Shoulders & Abs", "Arms & Core", "Full Body HIIT", "Rest & Recovery"];

const Dashboard = () => {
  const { user, fitnessProfile } = useAuth();
  const [plans] = useState([]);
  const [quote] = useState(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const hasProfile = fitnessProfile?.age && fitnessProfile?.weight && fitnessProfile?.height;

  const calculateBMI = () => {
    if (!fitnessProfile?.weight || !fitnessProfile?.height) return null;
    const h = parseFloat(fitnessProfile.height) / 100;
    const w = parseFloat(fitnessProfile.weight);
    if (!h || !w) return null;
    return (w / (h * h)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" };
    if (bmi < 25) return { label: "Normal", color: "text-primary" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-400" };
    return { label: "Obese", color: "text-red-400" };
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null;
  const bmiPercent = bmi ? Math.min((parseFloat(bmi) / 40) * 100, 100) : 0;

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayWorkout = { day: weekDays[todayIndex], focus: dayFocus[todayIndex] };

  const waterData = (() => {
    try {
      const saved = localStorage.getItem("vita_water_today");
      const data = saved ? JSON.parse(saved) : { count: 0, date: "" };
      return data.date === new Date().toDateString() ? data.count : 0;
    } catch {
      return 0;
    }
  })();

  const workoutLog = (() => {
    try {
      const saved = localStorage.getItem("vita_workout_log");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })();

  const thisWeekWorkouts = workoutLog.filter((w) => {
    const d = new Date(w.fullDate);
    const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });

  const stats = [
    { label: "Plans Generated", value: plans.length, icon: Sparkles },
    { label: "This Week", value: `${thisWeekWorkouts.length} sessions`, icon: Zap },
    { label: "Total Workouts", value: workoutLog.length, icon: Dumbbell },
    { label: "Water Today", value: `${waterData}/12 🥤`, icon: Droplets },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">

        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back, <span className="text-gradient">{user?.displayName || "Athlete"}</span>
          </h1>
          <p className="text-muted-foreground italic text-sm">"{quote}"</p>
        </div>

        {hasProfile ? (
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Your Body Stats</h2>
              <Link to="/profile" className="text-xs text-primary hover:underline">Edit</Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: UserCircle, label: "Age", value: `${fitnessProfile.age} yrs` },
                { icon: Ruler, label: "Height", value: `${fitnessProfile.height} cm` },
                { icon: Weight, label: "Weight", value: `${fitnessProfile.weight} kg` },
                { icon: Target, label: "Goal", value: fitnessProfile.goal, capitalize: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <s.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`text-lg font-bold font-display text-foreground ${s.capitalize ? "capitalize" : ""}`}>
                      {s.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Link to="/profile" className="glass-card p-6 mb-6 flex items-center gap-4 hover:border-primary/30 transition-all group block">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                Set Up Your Fitness Profile
              </h3>
              <p className="text-sm text-muted-foreground">
                Add your age, height, weight & goal to get started
              </p>
            </div>
          </Link>
        )}

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {/* BMI Card */}
          {hasProfile && bmi && (
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-display font-semibold text-foreground">BMI</h2>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold font-display text-foreground">{bmi}</span>
                <span className={`text-sm font-semibold mb-1 ${bmiCategory.color}`}>{bmiCategory.label}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{fitnessProfile.weight}kg · {fitnessProfile.height}cm</p>
              <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-400 via-primary to-orange-400 transition-all duration-500" style={{ width: `${bmiPercent}%` }} />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>
            </div>
          )}

          <Link to="/workouts" className="glass-card p-6 hover:border-primary/30 transition-all group block">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Today's Workout</h2>
            </div>
            <p className="text-2xl font-bold font-display text-foreground mb-1">{todayWorkout.day}</p>
            <p className="text-lg text-primary font-semibold">{todayWorkout.focus}</p>
            <p className="text-sm text-muted-foreground mt-3 group-hover:text-foreground transition-colors">
              Tap to view exercises →
            </p>
          </Link>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold font-display text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { to: "/generate", label: "Generate Plan", icon: Sparkles, gradient: true },
            { to: "/exercises", label: "Exercise Library", icon: Dumbbell },
            { to: "/tools", label: "Fitness Tools", icon: Calculator },
            { to: "/progress", label: "Track Progress", icon: TrendingUp },
          ].map((action) => (
            <Link key={action.to} to={action.to} className="glass-card p-5 flex flex-col items-center gap-3 hover:border-primary/30 transition-all group text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.gradient ? "gradient-primary" : "bg-primary/10"}`}>
                <action.icon className={`h-6 w-6 ${action.gradient ? "text-primary-foreground" : "text-primary"}`} />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;