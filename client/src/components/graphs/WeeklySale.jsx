import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklySale = () => {
  const data = [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 1500 },
    { day: "Wed", revenue: 2000 },
    { day: "Thu", revenue: 2525 },
    { day: "Fri", revenue: 2800 },
    { day: "Sat", revenue: 3000 },
    { day: "Sun", revenue: 2800 },
  ];

  const formatCurrency = (value) => `₱${value.toLocaleString()}`;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tick={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
            fill: "#000000",
          }}
          label={{
            value: "Day of the Week",
            position: "insideBottom",
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
            fill: "#000000",
            offset: -5,
          }}
        />
        <YAxis
          tick={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
            fill: "#000000",
          }}
          tickFormatter={formatCurrency}
        />
        <Tooltip
          formatter={formatCurrency}
          contentStyle={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem",
            color: "#000000",
          }}
          labelStyle={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem",
            color: "#000000",
          }}
        />
        <Bar
          dataKey="revenue"
          fill="rgb(74 222 128)"
          barSize={30}
          radius={[20, 20, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklySale;
