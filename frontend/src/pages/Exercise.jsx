import { useState } from "react";
import Navbar from "../components/Navbar";
import { Search, Dumbbell, Target, ChevronDown, ChevronUp, Flame } from "lucide-react";

const exerciseDatabase = {
  chest: {
    label: "Chest",
    color: "bg-red-500/20 text-red-400",
    exercises: [
      { name: "Flat Bench Press", sets: "4x8-12", muscle: "Mid Chest", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif", tips: "Keep feet flat, retract shoulder blades, grip slightly wider than shoulder width." },
      { name: "Incline Dumbbell Press", sets: "4x10-12", muscle: "Upper Chest", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif", tips: "Set bench to 30-45°, squeeze at the top, control the negative." },
      { name: "Cable Crossover", sets: "3x12-15", muscle: "Inner Chest", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif", tips: "Lean slightly forward, cross hands at the bottom for peak contraction." },
      { name: "Dumbbell Fly", sets: "3x12", muscle: "Outer Chest", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif", tips: "Slight bend in elbows, lower until you feel a stretch, don't go too heavy." },
      { name: "Push-Ups", sets: "3x15-20", muscle: "Full Chest", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif", tips: "Keep core tight, elbows at 45°, full range of motion." },
      { name: "Decline Bench Press", sets: "4x8-12", muscle: "Lower Chest", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Barbell-Bench-Press.gif", tips: "Set decline to 15-30°, lock feet securely, controlled movement." },
    ],
  },
  back: {
    label: "Back",
    color: "bg-blue-500/20 text-blue-400",
    exercises: [
      { name: "Deadlift", sets: "4x5-8", muscle: "Full Back", difficulty: "Advanced", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif", tips: "Keep bar close to body, neutral spine, drive through heels." },
      { name: "Pull-Ups", sets: "4x8-12", muscle: "Lats", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif", tips: "Full dead hang at bottom, pull to chest, control descent." },
      { name: "Barbell Row", sets: "4x8-12", muscle: "Mid Back", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif", tips: "Bend to 45°, pull to lower chest, squeeze shoulder blades." },
      { name: "Lat Pulldown", sets: "3x10-12", muscle: "Lats", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif", tips: "Slight lean back, pull to upper chest, wide grip." },
      { name: "Seated Cable Row", sets: "3x10-12", muscle: "Mid Back", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif", tips: "Keep torso upright, pull to abdomen, full stretch forward." },
      { name: "T-Bar Row", sets: "4x8-10", muscle: "Mid Back", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/T-Bar-Row.gif", tips: "Chest against pad, neutral grip, squeeze at the top." },
    ],
  },
  shoulders: {
    label: "Shoulders",
    color: "bg-yellow-500/20 text-yellow-400",
    exercises: [
      { name: "Overhead Press", sets: "4x8-10", muscle: "Front Delts", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Overhead-Press.gif", tips: "Brace core, press straight up, lockout at top." },
      { name: "Lateral Raises", sets: "4x12-15", muscle: "Side Delts", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif", tips: "Slight bend in elbows, raise to shoulder height, control the negative." },
      { name: "Face Pulls", sets: "3x15-20", muscle: "Rear Delts", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif", tips: "Pull to face level, external rotate at the top, use rope attachment." },
      { name: "Arnold Press", sets: "3x10-12", muscle: "All Delts", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif", tips: "Start palms facing you, rotate as you press up, smooth motion." },
      { name: "Front Raises", sets: "3x12", muscle: "Front Delts", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif", tips: "Raise to eye level, alternate arms, don't swing." },
      { name: "Rear Delt Fly", sets: "3x12-15", muscle: "Rear Delts", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Rear-Delt-Fly.gif", tips: "Bend over, squeeze shoulder blades, light weight high reps." },
    ],
  },
  legs: {
    label: "Legs",
    color: "bg-green-500/20 text-green-400",
    exercises: [
      { name: "Barbell Squats", sets: "4x8-12", muscle: "Quads & Glutes", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif", tips: "Break at hips first, knees track toes, depth below parallel." },
      { name: "Romanian Deadlift", sets: "4x8-10", muscle: "Hamstrings", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Romanian-Deadlift.gif", tips: "Hinge at hips, slight knee bend, feel hamstring stretch." },
      { name: "Leg Press", sets: "4x10-12", muscle: "Quads", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif", tips: "Feet shoulder width, don't lock knees, full range." },
      { name: "Walking Lunges", sets: "3x12 each", muscle: "Quads & Glutes", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif", tips: "Long stride, back knee almost touches ground, upright torso." },
      { name: "Leg Curls", sets: "3x12-15", muscle: "Hamstrings", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif", tips: "Control the negative, squeeze at the top, don't lift hips." },
      { name: "Calf Raises", sets: "4x15-20", muscle: "Calves", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Standing-Calf-Raise.gif", tips: "Full stretch at bottom, pause at top, slow and controlled." },
    ],
  },
  arms: {
    label: "Arms",
    color: "bg-purple-500/20 text-purple-400",
    exercises: [
      { name: "Barbell Curl", sets: "4x10-12", muscle: "Biceps", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif", tips: "Keep elbows pinned, no swinging, squeeze at top." },
      { name: "Skull Crushers", sets: "3x10-12", muscle: "Triceps", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Skull-Crusher.gif", tips: "Lower to forehead, elbows stay still, extend fully." },
      { name: "Hammer Curls", sets: "3x12", muscle: "Brachialis", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif", tips: "Neutral grip, alternate arms, controlled movement." },
      { name: "Tricep Pushdown", sets: "3x12-15", muscle: "Triceps", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif", tips: "Elbows at sides, full extension, squeeze at bottom." },
      { name: "Preacher Curls", sets: "3x10-12", muscle: "Biceps", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Preacher-Curl.gif", tips: "Arm fully on pad, don't swing, full range of motion." },
      { name: "Overhead Tricep Extension", sets: "3x12", muscle: "Long Head Triceps", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Triceps-Extension.gif", tips: "Keep elbows close, full stretch at bottom, lock out at top." },
    ],
  },
  core: {
    label: "Core",
    color: "bg-orange-500/20 text-orange-400",
    exercises: [
      { name: "Plank", sets: "3x60s", muscle: "Core", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Plank.gif", tips: "Straight line from head to heels, engage glutes, breathe steadily." },
      { name: "Hanging Leg Raises", sets: "3x12-15", muscle: "Lower Abs", difficulty: "Intermediate", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hanging-Leg-Raise.gif", tips: "Control the swing, raise legs to parallel, slow negative." },
      { name: "Cable Crunches", sets: "3x15-20", muscle: "Upper Abs", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crunch.gif", tips: "Curl down, bring elbows to knees, squeeze abs." },
      { name: "Russian Twists", sets: "3x20", muscle: "Obliques", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif", tips: "Lean back slightly, rotate fully, touch floor each side." },
      { name: "Mountain Climbers", sets: "3x30s", muscle: "Full Core", difficulty: "Beginner", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Mountain-Climber.gif", tips: "Keep hips low, drive knees to chest, maintain pace." },
      { name: "Ab Wheel Rollout", sets: "3x10", muscle: "Full Core", difficulty: "Advanced", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Ab-Wheel-Rollout.gif", tips: "Start from knees, extend fully, engage core throughout." },
    ],
  },
};

const difficultyColors = {
  Beginner: "text-green-400",
  Intermediate: "text-yellow-400",
  Advanced: "text-red-400",
};

const Exercises = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("chest");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const muscles = Object.entries(exerciseDatabase);
  const currentGroup = exerciseDatabase[selectedMuscle];

  const filteredExercises = currentGroup.exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || ex.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <Dumbbell className="h-8 w-8 text-primary" />
            Exercise Library
          </h1>
          <p className="text-muted-foreground">Browse 36+ exercises with visual guides, tips, and muscle targeting info</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary pl-10 pr-4 py-3 text-black placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["all", "Beginner", "Intermediate", "Advanced"].map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  difficultyFilter === d
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {d === "all" ? "All" : d}
              </button>
            ))}
          </div>
        </div>

        {/* Muscle Group Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {muscles.map(([key, group]) => (
            <button
              key={key}
              onClick={() => { setSelectedMuscle(key); setExpandedExercise(null); }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedMuscle === key
                  ? "gradient-primary text-primary-foreground shadow-lg"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* Muscle Group Header */}
        <div className="glass-card p-5 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground">{currentGroup.label} Exercises</h2>
            <p className="text-sm text-muted-foreground">{filteredExercises.length} exercises found</p>
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${currentGroup.color}`}>
            <Target className="h-3.5 w-3.5 inline mr-1" />
            {currentGroup.label}
          </div>
        </div>

        {/* Exercise Cards */}
        <div className="grid gap-4">
          {filteredExercises.map((exercise, i) => {
            const isExpanded = expandedExercise === i;
            return (
              <div
                key={i}
                className="glass-card overflow-hidden hover:border-primary/30 transition-all"
              >
                <div
                  className="flex flex-col sm:flex-row cursor-pointer"
                  onClick={() => setExpandedExercise(isExpanded ? null : i)}
                >
                  <div className="sm:w-48 h-40 sm:h-auto bg-secondary/50 overflow-hidden flex-shrink-0">
                    <img
                      src={exercise.gif}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                        e.target.className = "w-full h-full object-contain p-6 opacity-30";
                      }}
                    />
                  </div>
                  <div className="flex-1 p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-foreground">{exercise.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${currentGroup.color}`}>{exercise.muscle}</span>
                        <span className={`text-xs font-medium ${difficultyColors[exercise.difficulty]}`}>
                          <Flame className="h-3 w-3 inline mr-0.5" />{exercise.difficulty}
                        </span>
                        <span className="text-xs text-primary font-mono">{exercise.sets}</span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t border-border p-5 bg-secondary/30 animate-fade-in">
                    <h4 className="text-sm font-semibold text-foreground mb-2">💡 Pro Tips</h4>
                    <p className="text-sm text-muted-foreground">{exercise.tips}</p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div className="text-center p-2 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Sets × Reps</p>
                        <p className="text-sm font-bold text-primary">{exercise.sets}</p>
                      </div>
                      <div className="text-center p-2 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Target</p>
                        <p className="text-sm font-bold text-foreground">{exercise.muscle}</p>
                      </div>
                      <div className="text-center p-2 bg-background/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className={`text-sm font-bold ${difficultyColors[exercise.difficulty]}`}>{exercise.difficulty}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Exercises;