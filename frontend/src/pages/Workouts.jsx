import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { CalendarDays, ChevronRight, CheckCircle, Circle, Flame, Timer, RotateCcw, Zap, Heart } from "lucide-react";

const workoutSchedule = [
  {
    day: "Day 1 - Monday",
    focus: "Chest & Triceps",
    muscles: ["Chest", "Triceps"],
    warmup: [
      { name: "Arm Circles", duration: "30s each direction" },
      { name: "Band Pull-Aparts", duration: "2x15" },
      { name: "Light Push-Ups", duration: "2x10" },
    ],
    exercises: [
      { name: "Flat Bench Press", sets: "4x8-12", rest: "90s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif", tip: "Retract scapula, arch back slightly" },
      { name: "Incline Dumbbell Press", sets: "4x10-12", rest: "90s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif", tip: "30-45° incline, squeeze at top" },
      { name: "Cable Crossover", sets: "3x12-15", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif", tip: "Cross hands at bottom for peak contraction" },
      { name: "Dumbbell Fly", sets: "3x12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif", tip: "Slight elbow bend, feel the stretch" },
      { name: "Tricep Dips", sets: "3x12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Triceps-Dip.gif", tip: "Lean forward for chest, upright for triceps" },
      { name: "Tricep Pushdown", sets: "3x15", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif", tip: "Lock elbows, squeeze at bottom" },
    ],
    cooldown: ["Chest doorway stretch 30s each side", "Tricep overhead stretch 30s each", "Deep breathing 1 min"],
  },
  {
    day: "Day 2 - Tuesday",
    focus: "Back & Biceps",
    muscles: ["Back", "Biceps"],
    warmup: [
      { name: "Cat-Cow Stretch", duration: "1 min" },
      { name: "Band Rows", duration: "2x15" },
      { name: "Dead Hangs", duration: "2x20s" },
    ],
    exercises: [
      { name: "Pull-Ups", sets: "4x8-10", rest: "90s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif", tip: "Full dead hang, pull chest to bar" },
      { name: "Barbell Row", sets: "4x8-12", rest: "90s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif", tip: "45° torso, pull to lower chest" },
      { name: "Lat Pulldown", sets: "3x10-12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif", tip: "Wide grip, slight lean back" },
      { name: "Seated Cable Row", sets: "3x10-12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif", tip: "Pull to abdomen, squeeze shoulder blades" },
      { name: "Barbell Curls", sets: "3x10-12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif", tip: "Keep elbows pinned, no swinging" },
      { name: "Hammer Curls", sets: "3x12", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif", tip: "Neutral grip, controlled tempo" },
    ],
    cooldown: ["Lat stretch 30s each side", "Bicep wall stretch 30s each", "Child's pose 1 min"],
  },
  {
    day: "Day 3 - Wednesday",
    focus: "Legs & Glutes",
    muscles: ["Quads", "Hamstrings", "Glutes", "Calves"],
    warmup: [
      { name: "Leg Swings", duration: "15 each leg" },
      { name: "Bodyweight Squats", duration: "2x15" },
      { name: "Hip Circles", duration: "10 each direction" },
    ],
    exercises: [
      { name: "Barbell Squats", sets: "4x8-12", rest: "120s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif", tip: "Break at hips, depth below parallel" },
      { name: "Romanian Deadlift", sets: "4x8-10", rest: "90s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Romanian-Deadlift.gif", tip: "Hinge at hips, feel hamstring stretch" },
      { name: "Leg Press", sets: "4x10-12", rest: "90s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif", tip: "Feet shoulder width, full range" },
      { name: "Walking Lunges", sets: "3x12 each", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif", tip: "Long stride, upright torso" },
      { name: "Leg Curls", sets: "3x12-15", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif", tip: "Squeeze at top, slow negative" },
      { name: "Calf Raises", sets: "4x15-20", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Standing-Calf-Raise.gif", tip: "Full stretch, pause at top" },
    ],
    cooldown: ["Quad stretch 30s each", "Hamstring stretch 30s each", "Pigeon pose 30s each side"],
  },
  {
    day: "Day 4 - Thursday",
    focus: "Shoulders & Abs",
    muscles: ["Shoulders", "Core"],
    warmup: [
      { name: "Shoulder Dislocations", duration: "2x10" },
      { name: "Band External Rotation", duration: "2x12" },
      { name: "Arm Circles", duration: "30s each" },
    ],
    exercises: [
      { name: "Overhead Press", sets: "4x8-10", rest: "90s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Overhead-Press.gif", tip: "Brace core, lockout at top" },
      { name: "Lateral Raises", sets: "4x12-15", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif", tip: "Raise to shoulder height, control negative" },
      { name: "Face Pulls", sets: "3x15-20", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif", tip: "External rotate at the top" },
      { name: "Arnold Press", sets: "3x10-12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif", tip: "Rotate palms as you press" },
      { name: "Hanging Leg Raises", sets: "3x12-15", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hanging-Leg-Raise.gif", tip: "Control the swing, slow negative" },
      { name: "Plank", sets: "3x60s", rest: "30s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Plank.gif", tip: "Straight line, engage glutes" },
    ],
    cooldown: ["Shoulder cross-body stretch 30s each", "Cat-cow 1 min", "Deep breathing 1 min"],
  },
  {
    day: "Day 5 - Friday",
    focus: "Arms & Core",
    muscles: ["Biceps", "Triceps", "Core"],
    warmup: [
      { name: "Wrist Circles", duration: "30s each" },
      { name: "Light Curls", duration: "2x15" },
      { name: "Plank Hold", duration: "30s" },
    ],
    exercises: [
      { name: "Barbell Curls", sets: "4x10-12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif", tip: "Strict form, squeeze at top" },
      { name: "Skull Crushers", sets: "3x10-12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Skull-Crusher.gif", tip: "Lower to forehead, extend fully" },
      { name: "Preacher Curls", sets: "3x10-12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Preacher-Curl.gif", tip: "Full range, don't swing" },
      { name: "Overhead Tricep Extension", sets: "3x12", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Triceps-Extension.gif", tip: "Keep elbows close, full stretch" },
      { name: "Cable Crunches", sets: "3x15-20", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crunch.gif", tip: "Curl down, squeeze abs" },
      { name: "Russian Twists", sets: "3x20", rest: "30s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif", tip: "Lean back, rotate fully" },
    ],
    cooldown: ["Bicep wall stretch 30s", "Tricep stretch 30s each", "Cobra stretch 30s"],
  },
  {
    day: "Day 6 - Saturday",
    focus: "Full Body HIIT",
    muscles: ["Full Body", "Cardio"],
    warmup: [
      { name: "Jumping Jacks", duration: "1 min" },
      { name: "High Knees", duration: "30s" },
      { name: "Dynamic Stretches", duration: "2 min" },
    ],
    exercises: [
      { name: "Burpees", sets: "4x10", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Burpee.gif", tip: "Explosive jump, full push-up at bottom" },
      { name: "Jump Squats", sets: "3x15", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Jump-Squat.gif", tip: "Land softly, explode up" },
      { name: "Mountain Climbers", sets: "3x30s", rest: "30s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Mountain-Climber.gif", tip: "Keep hips low, fast pace" },
      { name: "Box Jumps", sets: "3x12", rest: "60s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Box-Jump.gif", tip: "Swing arms, land with soft knees" },
      { name: "Battle Ropes", sets: "3x30s", rest: "45s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Battle-Rope.gif", tip: "Alternate waves, keep core tight" },
      { name: "High Knees", sets: "3x30s", rest: "30s", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/High-Knee-Run.gif", tip: "Drive knees high, pump arms" },
    ],
    cooldown: ["Walk in place 2 min", "Full body stretch 3 min", "Deep breathing 1 min"],
  },
  {
    day: "Day 7 - Sunday",
    focus: "Rest & Recovery",
    muscles: ["Recovery", "Mobility"],
    warmup: [],
    exercises: [
      { name: "Foam Rolling", sets: "10 min", rest: "-", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Foam-Roller-IT-Band.gif", tip: "Roll slowly over tight areas" },
      { name: "Hamstring Stretch", sets: "3x30s each", rest: "-", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Hamstring-Stretch.gif", tip: "Hold at point of tension, don't bounce" },
      { name: "Cobra Stretch", sets: "3x30s", rest: "-", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cobra-Stretch.gif", tip: "Press hips into floor, open chest" },
      { name: "Hip Flexor Stretch", sets: "3x30s each", rest: "-", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Hamstring-Stretch.gif", tip: "Lunge position, push hips forward" },
    ],
    cooldown: ["Meditation or deep breathing 5 min"],
  },
];

const Workouts = () => {
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [completedExercises, setCompletedExercises] = useState(() => {
    const saved = localStorage.getItem("vita_completed_exercises");
    const data = saved ? JSON.parse(saved) : { date: "", completed: {} };
    return data.date === new Date().toDateString() ? data.completed : {};
  });
  const [showWarmup, setShowWarmup] = useState(true);

  const current = workoutSchedule[selectedDay];

  useEffect(() => {
    localStorage.setItem("vita_completed_exercises", JSON.stringify({ date: new Date().toDateString(), completed: completedExercises }));
  }, [completedExercises]);

  const toggleComplete = (dayIndex, exerciseIndex) => {
    const key = `${dayIndex}-${exerciseIndex}`;
    setCompletedExercises((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = current.exercises.filter((_, i) => completedExercises[`${selectedDay}-${i}`]).length;
  const progress = current.exercises.length > 0 ? Math.round((completedCount / current.exercises.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            Weekly Workout Plan
          </h1>
          <p className="text-muted-foreground">Follow this 7-day split. Check off exercises as you complete them.</p>
        </div>

        {/* Day selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {workoutSchedule.map((day, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedDay === i
                  ? "gradient-primary text-primary-foreground shadow-lg"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <div className="text-xs opacity-75">{day.day.split(" - ")[0]}</div>
              <div className="font-semibold">{day.day.split(" - ")[1]}</div>
            </button>
          ))}
        </div>

        {/* Day header with progress */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">{current.day}</h2>
              <p className="text-primary font-semibold text-lg">{current.focus}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold font-display text-foreground">{progress}%</p>
              <p className="text-xs text-muted-foreground">{completedCount}/{current.exercises.length} done</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          {/* Muscle tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {current.muscles.map((m) => (
              <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{m}</span>
            ))}
          </div>
        </div>

        {/* Warm-up Section */}
        {current.warmup && current.warmup.length > 0 && (
          <div className="glass-card p-5 mb-4">
            <button onClick={() => setShowWarmup(!showWarmup)} className="flex items-center gap-2 w-full text-left">
              <Flame className="h-4 w-4 text-orange-400" />
              <h3 className="text-sm font-display font-semibold text-foreground flex-1">Warm-Up ({current.warmup.length} exercises)</h3>
              <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${showWarmup ? "rotate-90" : ""}`} />
            </button>
            {showWarmup && (
              <div className="mt-3 space-y-2">
                {current.warmup.map((w, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded-lg">
                    <span className="text-sm text-foreground">{w.name}</span>
                    <span className="text-xs text-primary font-mono">{w.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Exercise cards with completion */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {current.exercises.map((exercise, i) => {
            const isCompleted = completedExercises[`${selectedDay}-${i}`];
            return (
              <div key={i} className={`glass-card overflow-hidden transition-all group ${isCompleted ? "border-primary/40 opacity-80" : "hover:border-primary/30"}`}>
                <div className="aspect-[4/3] bg-secondary/50 overflow-hidden relative">
                  <img
                    src={exercise.gif}
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { e.target.src = "/placeholder.svg"; e.target.className = "w-full h-full object-contain p-8 opacity-30"; }}
                  />
                  {isCompleted && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-primary" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-semibold text-foreground text-sm">{exercise.name}</h3>
                    <button onClick={() => toggleComplete(selectedDay, i)} className="transition-colors">
                      {isCompleted ? <CheckCircle className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-primary font-medium font-mono">{exercise.sets}</span>
                    {exercise.rest !== "-" && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Timer className="h-3 w-3" /> {exercise.rest} rest
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">💡 {exercise.tip}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cool-down Section */}
        {current.cooldown && current.cooldown.length > 0 && (
          <div className="glass-card p-5 mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-display font-semibold text-foreground">Cool-Down</h3>
            </div>
            <div className="space-y-2">
              {current.cooldown.map((item, i) => (
                <div key={i} className="py-2 px-3 bg-secondary/50 rounded-lg text-sm text-foreground">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {progress === 100 && (
          <div className="glass-card p-6 mt-6 text-center border-primary/30">
            <Zap className="h-10 w-10 text-primary mx-auto mb-2" />
            <h3 className="text-lg font-display font-bold text-foreground">Workout Complete! 🎉</h3>
            <p className="text-sm text-muted-foreground">Great job finishing today's session. Rest and recover!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Workouts;
