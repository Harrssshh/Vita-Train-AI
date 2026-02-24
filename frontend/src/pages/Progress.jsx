import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProgressChart from "../components/ProgressChart";
import { useAuth } from "../context/AuthContext";
import { TrendingUp, Target, Flame, Award, Plus, Trash2, Calendar, Weight, Dumbbell, BarChart3 } from "lucide-react";

const Progress = () => {
  const { fitnessProfile } = useAuth();

  const [weightLog, setWeightLog] = useState(() => {
    const saved = localStorage.getItem("vita_weight_log");
    return saved ? JSON.parse(saved) : [];
  });

  const [workoutLog, setWorkoutLog] = useState(() => {
    const saved = localStorage.getItem("vita_workout_log");
    return saved ? JSON.parse(saved) : [];
  });

  const [newWeight, setNewWeight] = useState("");
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutDuration, setNewWorkoutDuration] = useState("");
  const [activeChart, setActiveChart] = useState("weight");
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("vita_weight_log", JSON.stringify(weightLog));
  }, [weightLog]);

  useEffect(() => {
    localStorage.setItem("vita_workout_log", JSON.stringify(workoutLog));
  }, [workoutLog]);

  const addWeight = (e) => {
    e.preventDefault();
    if (!newWeight) return;
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      fullDate: new Date().toISOString(),
      weight: parseFloat(newWeight),
    };
    setWeightLog((prev) => [...prev, entry]);
    setNewWeight("");
    setShowWeightForm(false);
  };

  const addWorkout = (e) => {
    e.preventDefault();
    if (!newWorkoutName || !newWorkoutDuration) return;
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      fullDate: new Date().toISOString(),
      name: newWorkoutName,
      duration: parseInt(newWorkoutDuration),
    };
    setWorkoutLog((prev) => [...prev, entry]);
    setNewWorkoutName("");
    setNewWorkoutDuration("");
    setShowWorkoutForm(false);
  };

  const deleteWeight = (id) => setWeightLog((prev) => prev.filter((e) => e.id !== id));
  const deleteWorkout = (id) => setWorkoutLog((prev) => prev.filter((e) => e.id !== id));

  const totalWorkouts = workoutLog.length;
  const totalDuration = workoutLog.reduce((acc, w) => acc + w.duration, 0);
  const currentWeight = weightLog.length > 0 ? weightLog[weightLog.length - 1].weight : (fitnessProfile?.weight || "--");
  const weightChange = weightLog.length >= 2
    ? (weightLog[weightLog.length - 1].weight - weightLog[0].weight).toFixed(1)
    : 0;

  // Streak calculation
  const getStreak = () => {
    if (workoutLog.length === 0) return 0;
    const sorted = [...workoutLog].sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate));
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff = (new Date(sorted[i - 1].fullDate) - new Date(sorted[i].fullDate)) / (1000 * 60 * 60 * 24);
      if (diff <= 1.5) streak++;
      else break;
    }
    return streak;
  };

  const stats = [
    { label: "Current Weight", value: `${currentWeight} kg`, change: `${weightChange >= 0 ? "+" : ""}${weightChange} kg total`, icon: Target },
    { label: "Workouts Done", value: `${totalWorkouts}`, change: `${totalDuration} min total`, icon: Flame },
    { label: "Streak", value: `${getStreak()} days`, change: getStreak() >= 7 ? "🔥 On fire!" : "Keep going!", icon: Award },
    { label: "Avg. Duration", value: totalWorkouts > 0 ? `${Math.round(totalDuration / totalWorkouts)} min` : "-- min", change: totalWorkouts > 0 ? `Over ${totalWorkouts} sessions` : "Log a workout!", icon: TrendingUp },
  ];

  const chartData = weightLog.map((entry) => ({
    date: entry.date,
    weight: entry.weight,
  }));

  const workoutChartData = (() => {
    const grouped = {};
    workoutLog.forEach((w) => {
      if (!grouped[w.date]) grouped[w.date] = { date: w.date, duration: 0, count: 0 };
      grouped[w.date].duration += w.duration;
      grouped[w.date].count += 1;
    });
    return Object.values(grouped);
  })();

  const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Progress Tracker
          </h1>
          <p className="text-muted-foreground">Log your weights & workouts to track your fitness journey dynamically</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
              <p className="text-xs text-primary mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Log Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => { setShowWeightForm(!showWeightForm); setShowWorkoutForm(false); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Log Weight
          </button>
          <button
            onClick={() => { setShowWorkoutForm(!showWorkoutForm); setShowWeightForm(false); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary font-medium text-sm hover:bg-primary/10 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Log Workout
          </button>
        </div>

        {/* Weight Entry Form */}
        {showWeightForm && (
          <form onSubmit={addWeight} className="glass-card p-5 mb-6 flex flex-col sm:flex-row gap-3 items-end animate-fade-in">
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-sm font-medium text-foreground">Today's Weight (kg)</label>
              <input type="number" step="0.1" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} placeholder="e.g. 65.5" required className={inputClass} />
            </div>
            <button type="submit" className="px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
              Save Entry
            </button>
          </form>
        )}

        {/* Workout Entry Form */}
        {showWorkoutForm && (
          <form onSubmit={addWorkout} className="glass-card p-5 mb-6 flex flex-col sm:flex-row gap-3 items-end animate-fade-in">
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-sm font-medium text-foreground">Workout Name</label>
              <input type="text" value={newWorkoutName} onChange={(e) => setNewWorkoutName(e.target.value)} placeholder="e.g. Chest & Triceps" required className={inputClass} />
            </div>
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-sm font-medium text-foreground">Duration (min)</label>
              <input type="number" value={newWorkoutDuration} onChange={(e) => setNewWorkoutDuration(e.target.value)} placeholder="e.g. 45" required className={inputClass} />
            </div>
            <button type="submit" className="px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
              Save Workout
            </button>
          </form>
        )}

        {/* Chart Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "weight", label: "Weight", icon: Weight },
            { key: "workouts", label: "Workouts", icon: Dumbbell },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveChart(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeChart === tab.key
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Charts */}
        {activeChart === "weight" && (
          <ProgressChart
            data={chartData.length > 0 ? chartData : undefined}
            title="Weight Progress"
            dataKey="weight"
            color="hsl(82 85% 45%)"
            unit=" kg"
          />
        )}
        {activeChart === "workouts" && (
          <ProgressChart
            data={workoutChartData.length > 0 ? workoutChartData : undefined}
            title="Workout Duration"
            dataKey="duration"
            color="hsl(200 85% 55%)"
            unit=" min"
          />
        )}

        {/* Recent Entries */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {/* Weight Log */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Weight className="h-5 w-5 text-primary" />
              Weight Log
            </h3>
            {weightLog.length === 0 ? (
              <p className="text-muted-foreground text-sm">No entries yet. Log your first weight above!</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[...weightLog].reverse().map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">{entry.weight} kg</span>
                      <button onClick={() => deleteWeight(entry.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Workout Log */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Workout Log
            </h3>
            {workoutLog.length === 0 ? (
              <p className="text-muted-foreground text-sm">No workouts logged yet. Start tracking!</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[...workoutLog].reverse().map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                      <span className="text-sm font-medium text-foreground">{entry.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-primary">{entry.duration} min</span>
                      <button onClick={() => deleteWorkout(entry.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;