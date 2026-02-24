import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ProgressChart = ({ data }) => {
  const defaultData = [
    { date: "Week 1", weight: 65, workouts: 3 },
    { date: "Week 2", weight: 64.5, workouts: 4 },
    { date: "Week 3", weight: 64, workouts: 5 },
    { date: "Week 4", weight: 63.5, workouts: 4 },
    { date: "Week 5", weight: 63, workouts: 5 },
    { date: "Week 6", weight: 62.5, workouts: 6 },
  ];

  const chartData = data || defaultData;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-display font-semibold text-foreground mb-6">Weight Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
            <XAxis dataKey="date" tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220 18% 10%)",
                border: "1px solid hsl(220 15% 22%)",
                borderRadius: "8px",
                color: "hsl(0 0% 95%)",
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="hsl(82 85% 45%)"
              strokeWidth={3}
              dot={{ fill: "hsl(82 85% 45%)", r: 5 }}
              activeDot={{ r: 7, fill: "hsl(82 85% 45%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
