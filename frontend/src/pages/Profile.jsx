import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { User, Mail, Calendar, Ruler, Weight, Target, Save, CheckCircle } from "lucide-react";

const Profile = () => {
  const { user, fitnessProfile, updateFitnessProfile } = useAuth();
  const [age, setAge] = useState(fitnessProfile?.age || "");
  const [weight, setWeight] = useState(fitnessProfile?.weight || "");
  const [height, setHeight] = useState(fitnessProfile?.height || "");
  const [goal, setGoal] = useState(fitnessProfile?.goal || "muscle gain");
  const [saved, setSaved] = useState(false);

  const goals = ["muscle gain", "weight loss", "endurance", "flexibility", "general fitness"];

  const handleSave = (e) => {
    e.preventDefault();
    updateFitnessProfile({ age, weight, height, goal });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-black placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account and fitness details</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl">
          {/* Account Info */}
          <div className="glass-card p-8">
            <h2 className="text-lg font-display font-semibold text-foreground mb-6">Account Info</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">{user?.displayName || "User"}</h3>
                <p className="text-sm text-muted-foreground">Free Plan</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-medium text-foreground">{user?.displayName || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium text-foreground">2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Profile */}
          <div className="glass-card p-8">
            <h2 className="text-lg font-display font-semibold text-foreground mb-6">Fitness Profile</h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-muted-foreground" /> Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 22"
                    min="10"
                    max="100"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Ruler className="h-3.5 w-3.5 text-muted-foreground" /> Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                    min="100"
                    max="250"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Weight className="h-3.5 w-3.5 text-muted-foreground" /> Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 65"
                  min="20"
                  max="300"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Target className="h-3.5 w-3.5 text-muted-foreground" /> Fitness Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className={inputClass}
                >
                  {goals.map((g) => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg gradient-primary px-6 py-3.5 font-semibold text-primary-foreground hover:opacity-90 transition-all"
              >
                {saved ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Fitness Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
