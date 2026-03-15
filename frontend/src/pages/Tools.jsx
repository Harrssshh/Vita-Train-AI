import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Calculator, Droplets, Flame, Timer, RotateCcw, Play, Pause, Trophy, Target} from "lucide-react";

const Tools = () => {
  const [activeTab, setActiveTab] = useState("1rm");

  const tabs = [
    { key: "1rm", label: "1RM Calculator", icon: Trophy },
    { key: "calories", label: "Calorie Calculator", icon: Flame },
    { key: "water", label: "Water Tracker", icon: Droplets },
    { key: "timer", label: "Rest Timer", icon: Timer },
    { key: "macro", label: "Macro Splitter", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-primary" />
            Fitness Tools
          </h1>
          <p className="text-muted-foreground">Essential calculators and trackers for your training</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "gradient-primary text-primary-foreground shadow-lg"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "1rm" && <OneRepMaxCalc />}
        {activeTab === "calories" && <CalorieCalc />}
        {activeTab === "water" && <WaterTracker />}
        {activeTab === "timer" && <RestTimer />}
        {activeTab === "macro" && <MacroSplitter />}
      </main>
    </div>
  );
};

// ========== 1RM Calculator ==========
const OneRepMaxCalc = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const oneRM = weight && reps ? Math.round(parseFloat(weight) * (1 + parseFloat(reps) / 30)) : null;

  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          One Rep Max (Epley Formula)
        </h2>
        <p className="text-sm text-muted-foreground mb-5">Enter the weight you lifted and how many reps to estimate your 1RM.</p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Weight Lifted (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 80" className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Reps Performed</label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="e.g. 5" min="1" max="30" className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
        </div>
        {oneRM && (
          <div className="mt-6 p-5 bg-primary/10 rounded-xl text-center">
            <p className="text-sm text-muted-foreground mb-1">Estimated 1RM</p>
            <p className="text-4xl font-bold font-display text-primary">{oneRM} <span className="text-lg text-muted-foreground">kg</span></p>
          </div>
        )}
      </div>
      {oneRM && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">Training Load Chart</h3>
          <div className="space-y-2">
            {percentages.map((pct) => (
              <div key={pct} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">{pct}%</span>
                <div className="flex-1 mx-4 h-2 rounded-full bg-background overflow-hidden">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-bold text-foreground font-mono">{Math.round(oneRM * pct / 100)} kg</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ========== Calorie Calculator ==========
const CalorieCalc = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!age || !weight || !height) return;
    const bmr = gender === "male"
      ? 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5
      : 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
    const tdee = Math.round(bmr * parseFloat(activity));
    setResult({ bmr: Math.round(bmr), tdee, cut: tdee - 500, bulk: tdee + 300, maintain: tdee });
  };

  const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Calorie & TDEE Calculator
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            {["male", "female"].map((g) => (
              <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${gender === g ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5"><label className="text-xs font-medium text-foreground">Age</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="22" className={inputClass} /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-foreground">Weight (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className={inputClass} /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-foreground">Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" className={inputClass} /></div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Activity Level</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className={inputClass}>
              <option value="1.2">Sedentary (desk job)</option>
              <option value="1.375">Light (1-3 days/week)</option>
              <option value="1.55">Moderate (3-5 days/week)</option>
              <option value="1.725">Active (6-7 days/week)</option>
              <option value="1.9">Very Active (2x/day)</option>
            </select>
          </div>
          <button onClick={calculate} className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">Calculate</button>
        </div>
      </div>
      {result && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-display font-semibold text-foreground">Your Results</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "BMR", value: `${result.bmr}`, desc: "Base metabolic rate" },
              { label: "TDEE", value: `${result.tdee}`, desc: "Maintenance calories" },
              { label: "Fat Loss", value: `${result.cut}`, desc: "-500 cal deficit" },
              { label: "Muscle Gain", value: `${result.bulk}`, desc: "+300 cal surplus" },
            ].map((r) => (
              <div key={r.label} className="p-4 bg-secondary/50 rounded-xl text-center">
                <p className="text-xs text-muted-foreground">{r.label}</p>
                <p className="text-2xl font-bold font-display text-primary">{r.value}</p>
                <p className="text-[10px] text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ========== Water Tracker ==========
const WaterTracker = () => {
  const [glasses, setGlasses] = useState(() => {
    const saved = localStorage.getItem("vita_water_today");
    const data = saved ? JSON.parse(saved) : { count: 0, date: "" };
    return data.date === new Date().toDateString() ? data.count : 0;
  });
  const goal = 12; // 250ml × 12 = 3L

  useEffect(() => {
    localStorage.setItem("vita_water_today", JSON.stringify({ count: glasses, date: new Date().toDateString() }));
  }, [glasses]);

  const percentage = Math.min((glasses / goal) * 100, 100);

  return (
    <div className="max-w-lg mx-auto">
      <div className="glass-card p-8 text-center">
        <Droplets className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h2 className="text-lg font-display font-semibold text-foreground mb-2">Daily Water Intake</h2>
        <p className="text-sm text-muted-foreground mb-6">Goal: {goal} glasses (250ml each) = 3L</p>

        {/* Visual tracker */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(200 85% 55%)" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-display text-foreground">{glasses}</span>
            <span className="text-xs text-muted-foreground">/ {goal}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{Math.round(percentage)}% of daily goal</p>

        {/* Glass buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Array.from({ length: goal }).map((_, i) => (
            <button
              key={i}
              onClick={() => setGlasses(i + 1)}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                i < glasses
                  ? "bg-blue-500/30 text-blue-400 border border-blue-500/50"
                  : "bg-secondary text-muted-foreground border border-border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={() => setGlasses(Math.max(0, glasses - 1))} className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors text-sm">
            − Remove
          </button>
          <button onClick={() => setGlasses(Math.min(goal, glasses + 1))} className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
            + Add Glass
          </button>
        </div>

        {glasses >= goal && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary font-semibold">🎉 Daily goal reached! Great job staying hydrated!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== Rest Timer ==========
const RestTimer = () => {
  const [seconds, setSeconds] = useState(90);
  const [remaining, setRemaining] = useState(90);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const presets = [30, 60, 90, 120, 180, 300];

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setRunning(false);
            // Play a beep
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = ctx.createOscillator();
              osc.connect(ctx.destination);
              osc.frequency.value = 800;
              osc.start();
              setTimeout(() => osc.stop(), 200);
            } catch (e) {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, remaining]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const percentage = (remaining / seconds) * 100;

  return (
    <div className="max-w-lg mx-auto">
      <div className="glass-card p-8 text-center">
        <Timer className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-lg font-display font-semibold text-foreground mb-6">Rest Timer</h2>

        {/* Timer display */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold font-display text-foreground">{formatTime(remaining)}</span>
            <span className="text-xs text-muted-foreground mt-1">remaining</span>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {presets.map((s) => (
            <button
              key={s}
              onClick={() => { setSeconds(s); setRemaining(s); setRunning(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                seconds === s && !running ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {formatTime(s)}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setRemaining(seconds); setRunning(false); }}
            className="px-5 py-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={() => setRunning(!running)}
            className="px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
          </button>
        </div>

        {remaining === 0 && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg animate-pulse">
            <p className="text-sm text-primary font-semibold">⏰ Time's up! Start your next set!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== Macro Splitter ==========
const MacroSplitter = () => {
  const [calories, setCalories] = useState("");
  const [split, setSplit] = useState("balanced");

  const splits = {
    balanced: { protein: 0.30, carbs: 0.40, fats: 0.30, label: "Balanced" },
    highProtein: { protein: 0.40, carbs: 0.35, fats: 0.25, label: "High Protein" },
    lowCarb: { protein: 0.35, carbs: 0.20, fats: 0.45, label: "Low Carb / Keto" },
    bulking: { protein: 0.25, carbs: 0.50, fats: 0.25, label: "Bulking" },
  };

  const current = splits[split];
  const cal = parseFloat(calories) || 0;
  const protein = Math.round((cal * current.protein) / 4);
  const carbs = Math.round((cal * current.carbs) / 4);
  const fats = Math.round((cal * current.fats) / 9);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Macro Nutrient Splitter
        </h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Daily Calories</label>
            <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="e.g. 2200" className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(splits).map(([key, s]) => (
              <button key={key} onClick={() => setSplit(key)} className={`py-2.5 rounded-lg text-xs font-medium transition-all ${split === key ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {cal > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Protein", value: `${protein}g`, cal: Math.round(cal * current.protein), pct: `${Math.round(current.protein * 100)}%`, color: "text-red-400" },
              { label: "Carbs", value: `${carbs}g`, cal: Math.round(cal * current.carbs), pct: `${Math.round(current.carbs * 100)}%`, color: "text-yellow-400" },
              { label: "Fats", value: `${fats}g`, cal: Math.round(cal * current.fats), pct: `${Math.round(current.fats * 100)}%`, color: "text-blue-400" },
            ].map((m) => (
              <div key={m.label} className="p-4 bg-secondary/50 rounded-xl text-center">
                <p className={`text-xs font-semibold ${m.color}`}>{m.label} ({m.pct})</p>
                <p className="text-2xl font-bold font-display text-foreground mt-1">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.cal} kcal</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
