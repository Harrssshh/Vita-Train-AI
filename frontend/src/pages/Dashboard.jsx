import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// import PlanCard from "../components/PlanCard";
import { Sparkles, TrendingUp,  Dumbbell, Ruler, Weight, UserCircle, Target, Heart, Activity } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user, fitnessProfile } = useAuth();
  // const [plans, setPlans] = useState([]);

  // seEffect(() => {
  //   const loadPlans = async () => {
  //     try {
  //       const data = await getWorkoutHistory();
  //       setPlans(data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   loadPlans();
  // }, []);u

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

  const stats = [
    { label: "Workouts Generated", value: plans.length, icon: Dumbbell },
    { label: "Active Streak", value: "5 days", icon: TrendingUp },
    { label: "This Week", value: "3 sessions", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back, <span className="text-gradient">{user?.displayName || "Athlete"}</span>
          </h1>
          <p className="text-muted-foreground">Here's your fitness overview</p>
        </div>

        {/* Body Stats Card */}
        {hasProfile ? (
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Your Body Stats</h2>
              <Link to="/profile" className="text-xs text-primary hover:underline">Edit</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="text-lg font-bold font-display text-foreground">{fitnessProfile.age} yrs</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Height</p>
                  <p className="text-lg font-bold font-display text-foreground">{fitnessProfile.height} cm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Weight className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Weight</p>
                  <p className="text-lg font-bold font-display text-foreground">{fitnessProfile.weight} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Goal</p>
                  <p className="text-lg font-bold font-display text-foreground capitalize">{fitnessProfile.goal}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/profile" className="glass-card p-6 mb-8 flex items-center gap-4 hover:border-primary/30 transition-all group block">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                Set Up Your Fitness Profile
              </h3>
              <p className="text-sm text-muted-foreground">Add your age, height, weight & goal to get started</p>
            </div>
          </Link>
        )}

        {/* BMI Card */}
        {hasProfile && bmi && (
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">BMI Calculator</h2>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold font-display text-foreground">{bmi}</span>
                  <span className={`text-sm font-semibold mb-1 ${bmiCategory.color}`}>{bmiCategory.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Based on {fitnessProfile.weight}kg &amp; {fitnessProfile.height}cm
                </p>
                <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 via-primary to-orange-400 transition-all duration-500"
                    style={{ width: `${bmiPercent}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
              <div className="hidden sm:flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30">
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
  <Link
    to="/generate"
    className="glass-card p-6 flex items-center gap-4 hover:border-primary/30 transition-all group"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
      <Sparkles className="h-6 w-6 text-primary-foreground" />
    </div>
    <div>
      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
        Generate New Plan
      </h3>
      <p className="text-sm text-muted-foreground">
        Create an AI workout & diet plan
      </p>
    </div>
  </Link>
</div>

        {/* Quick Actions
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/generate"
            className="glass-card p-6 flex items-center gap-4 hover:border-primary/30 transition-all group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                Generate New Plan
              </h3>
              <p className="text-sm text-muted-foreground">Create an AI workout & diet plan</p>
            </div>
          </Link>
          <Link
            to="/history"
            className="glass-card p-6 flex items-center gap-4 hover:border-primary/30 transition-all group"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <History className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                View History
              </h3>
              <p className="text-sm text-muted-foreground">Browse your past workout plans</p>
            </div>
          </Link>
        </div>

        {/* Recent Plans */}
        {/* <div>
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">Recent Plans</h2>
          {plans.length > 0 ? (
            <div className="grid gap-4">
              {plans.slice(0, 3).map((plan) => (
                <PlanCard key={plan._id} plan={plan} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No workout plans yet</p>
              <Link
                to="/generate"
                className="inline-flex items-center gap-2 rounded-lg gradient-primary px-6 py-3 font-semibold text-primary-foreground"
              >
                <Sparkles className="h-4 w-4" />
                Generate Your First Plan
              </Link>
            </div>
          )}
        // </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
