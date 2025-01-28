"use client";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    { name: "Total", count: boys + girls, fill: "#ffffff" },
    { name: "Girls", count: girls, fill: "#BB86FC" },
    { name: "Boys", count: boys, fill: "#03dac6" },
  ];

  return (
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
          <Legend
            align="center"
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/maleFemale.png"
          alt="Gender Distribution"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default CountChart;
