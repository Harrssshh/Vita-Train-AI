import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const WorkoutForm = ({ onSubmit, loading }) => {
  const { fitnessProfile } = useAuth();

  const [age, setAge] = useState(fitnessProfile?.age || "");
  const [weight, setWeight] = useState(fitnessProfile?.weight || "");
  const [height, setHeight] = useState(fitnessProfile?.height || "");
  const [goal, setGoal] = useState(fitnessProfile?.goal || "muscle gain");
  const [experience, setExperience] = useState("intermediate");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [duration, setDuration] = useState("60");
  const [equipment, setEquipment] = useState("full gym");
  const [injuries, setInjuries] = useState("");
  const [gender, setGender] = useState("male");
  const [dietPreference, setDietPreference] = useState("veg");

  // ⭐ NEW FIELDS (diet accuracy)
  const [supplements, setSupplements] = useState("none");
  const [foodRestrictions, setFoodRestrictions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!age || !weight || !height) return;

    onSubmit({
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      goal,
      experience,
      daysPerWeek: Number(daysPerWeek),
      duration: Number(duration),
      equipment,
      dietPreference,
      injuries,
      gender,
      supplements,
      foodRestrictions,
    });
  };

  const goals = [
    "muscle gain",
    "weight loss",
    "endurance",
    "flexibility",
    "general fitness",
    "strength",
    "body recomposition",
  ];

  const experienceLevels = ["beginner", "intermediate", "advanced"];
  const equipmentOptions = [
    "full gym",
    "dumbbells only",
    "bodyweight only",
    "home gym (basic)",
    "resistance bands",
  ];

  const inputClass =
    "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none";

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
      <h3 className="text-sm font-semibold text-primary uppercase">
        Personal Info
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <input type="number" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)} className={inputClass}/>
        <input type="number" placeholder="Height (cm)" value={height} onChange={(e)=>setHeight(e.target.value)} className={inputClass}/>
        <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e)=>setWeight(e.target.value)} className={inputClass}/>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select value={gender} onChange={(e)=>setGender(e.target.value)} className={inputClass}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select value={goal} onChange={(e)=>setGoal(e.target.value)} className={inputClass}>
          {goals.map(g => <option key={g}>{g}</option>)}
        </select>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-primary uppercase">
          Gym Preferences
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select value={experience} onChange={(e)=>setExperience(e.target.value)} className={inputClass}>
          {experienceLevels.map(l => <option key={l}>{l}</option>)}
        </select>

        <select value={equipment} onChange={(e)=>setEquipment(e.target.value)} className={inputClass}>
          {equipmentOptions.map(eq => <option key={eq}>{eq}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <select value={daysPerWeek} onChange={(e)=>setDaysPerWeek(e.target.value)} className={inputClass}>
          {[3,4,5,6].map(d => <option key={d}>{d} days</option>)}
        </select>

        <select value={duration} onChange={(e)=>setDuration(e.target.value)} className={inputClass}>
          {[30,45,60,75,90].map(d => <option key={d}>{d} min</option>)}
        </select>
      </div>

      <select value={dietPreference} onChange={(e)=>setDietPreference(e.target.value)} className={inputClass}>
        <option value="veg">Vegetarian</option>
        <option value="nonveg">Non-Vegetarian</option>
      </select>

      {/* ⭐ NEW INPUTS */}
      <select value={supplements} onChange={(e)=>setSupplements(e.target.value)} className={inputClass}>
        <option value="none">No Supplements</option>
        <option value="whey">Whey Allowed</option>
        <option value="all">All Supplements OK</option>
      </select>

      <input
        type="text"
        placeholder="Food allergies / restrictions"
        value={foodRestrictions}
        onChange={(e)=>setFoodRestrictions(e.target.value)}
        className={inputClass}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-lg gradient-primary px-6 py-3.5 font-semibold text-primary-foreground"
      >
        {loading ? <Loader2 className="animate-spin"/> : <Sparkles/>}
        Generate AI Plan
      </button>
    </form>
  );
};

export default WorkoutForm;