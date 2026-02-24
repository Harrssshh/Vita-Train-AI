import { useState } from "react";
import Navbar from "../components/Navbar";
import { CalendarDays, ChevronRight } from "lucide-react";

const workoutSchedule = [
  {
    day: "Day 1 - Monday",
    focus: "Chest & Triceps",
    exercises: [
      { name: "Push-Ups", sets: "4x15", gif: "/gifs/Push-Up.gif" },
      { name: "Dumbbell Bench Press", sets: "4x12", gif: "/gifs/Dumbbell-Press.gif" },
      { name: "Chest Fly", sets: "3x12", gif: "/gifs/Dumbbell-Fly.gif" },
      { name: "Tricep Dips", sets: "3x12", gif: "/gifs/Triceps-Dips.gif" },
      { name: "Tricep Pushdown", sets: "3x15", gif: "/gifs/Pushdown.gif" },
    ],
  },
  {
    day: "Day 2 - Tuesday",
    focus: "Back & Biceps",
    exercises: [
      { name: "Pull-Ups", sets: "4x10", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif" },
      { name: "Bent Over Row", sets: "4x12", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif" },
      { name: "Lat Pulldown", sets: "3x12", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif" },
      { name: "Bicep Curls", sets: "3x15", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif" },
      { name: "Hammer Curls", sets: "3x12", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif" },
    ],
  },
  {
    day: "Day 3 - Wednesday",
    focus: "Legs & Glutes",
    exercises: [
      { name: "Squats", sets: "4x15", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif" },
      { name: "Lunges", sets: "3x12 each", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif" },
      { name: "Leg Press", sets: "4x12", gif: "/gifs/Leg-Press.gif" },
      { name: "Leg Curls", sets: "3x15", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif" },
      { name: "Calf Raises", sets: "4x20", gif: "/gifs/Dumbbell-Calf-Raise.gif" },
    ],
  },
  {
    day: "Day 4 - Thursday",
    focus: "Shoulders & Abs",
    exercises: [
      { name: "Overhead Press", sets: "4x12", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif" },
      { name: "Lateral Raises", sets: "3x15", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif" },
      { name: "Front Raises", sets: "3x12", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif" },
      { name: "Plank", sets: "3x60s", gif: "/gifs/body-saw-plank.gif" },
      { name: "Crunches", sets: "4x20", gif: "/gifs/Crunch.gif" },
    ],
  },
  {
    day: "Day 5 - Friday",
    focus: "Arms & Core",
    exercises: [
      { name: "Barbell Curls", sets: "4x12", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif" },
      { name: "Skull Crushers", sets: "3x12", gif: "/gifs/Dumbbell-Skull-Crusher.gif" },
      { name: "Cable Curls", sets: "3x15", gif: "/gifs/Cable-Tricep-Kickback.gif" },
      { name: "Mountain Climbers", sets: "3x30s", gif: "/gifs/Mountain-climber.gif" },
      { name: "Leg Raises", sets: "3x15", gif: "/gifs/Lying-Leg-Raise.gif" },
    ],
  },
  {
    day: "Day 6 - Saturday",
    focus: "Full Body HIIT",
    exercises: [
      { name: "Burpees", sets: "4x10", gif: "/gifs/Burpee-with-Push-Up.gif" },
      { name: "Jump Squats", sets: "3x15", gif: "/gifs/Jump-Squat.gif" },
      { name: "High Knees", sets: "3x30s", gif: "/gifs/Elbow-To-Knee-Twists.gif" },
      { name: "Box Jumps", sets: "3x12", gif: "/gifs/The-Box-Jump.gif" },
      { name: "Battle Ropes", sets: "3x30s", gif: "/gifs/Battle-Rope.gif" },
    ],
  },
  {
    day: "Day 7 - Sunday",
    focus: "Rest & Recovery",
    exercises: [
      { name: "Foam Rolling", sets: "10 min", gif: "/gifs/Roll-Upper-Back.gif" },
      { name: "Stretching Routine", sets: "15 min", gif: "/gifs/Seated-Hamstring-Stretch.gif" },
      { name: "Yoga Flow", sets: "20 min", gif: "/gifs/forward-bend.gif" },
    ],
  },
];

const Workouts = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const current = workoutSchedule[selectedDay];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            Weekly Workout Plan
          </h1>
          <p className="text-muted-foreground">Follow this 7-day split for optimal results. Each exercise includes a visual guide.</p>
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

        {/* Selected day header */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">{current.day}</h2>
          <p className="text-primary font-semibold text-lg">{current.focus}</p>
          <p className="text-sm text-muted-foreground mt-1">{current.exercises.length} exercises</p>
        </div>

        {/* Exercise cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {current.exercises.map((exercise, i) => (
            <div key={i} className="glass-card overflow-hidden hover:border-primary/30 transition-all group">
              <div className="aspect-[4/3] bg-secondary/50 overflow-hidden">
                <img
                  src={exercise.gif}
                  alt={exercise.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                    e.target.className = "w-full h-full object-contain p-8 opacity-30";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground">{exercise.name}</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-primary font-medium mt-1">{exercise.sets}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Workouts;