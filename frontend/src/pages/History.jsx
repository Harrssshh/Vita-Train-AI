// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import PlanCard from "../components/PlanCard";
// import { History as HistoryIcon } from "lucide-react";
// import { getWorkoutHistory } from "../services/aiService";

// const History = () => {
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getWorkoutHistory();
//         setPlans(data);
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     load();
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="container mx-auto px-4 pt-24 pb-12">
//         <div className="mb-8">
//           <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
//             <HistoryIcon className="h-8 w-8 text-primary" />
//             Workout History
//           </h1>
//           <p className="text-muted-foreground">Browse all your previously generated AI plans</p>
//         </div>

//         {plans.length > 0 ? (
//           <div className="grid gap-4">
//             {plans.map((plan) => (
//               <PlanCard key={plan._id} plan={plan} />
//             ))}
//           </div>
//         ) : (
//           <div className="glass-card p-12 text-center">
//             <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//             <p className="text-muted-foreground">No workout history yet. Generate your first plan!</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default History;
