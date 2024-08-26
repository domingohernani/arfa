import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OrdersOverTime = () => {
  const [lineStatus, setLineStatus] = useState({
    2023: true,
    2024: true,
  });

  const data = [
    { month: "Jan", 2023: 50, 2024: 65 },
    { month: "Feb", 2023: 60, 2024: 59 },
    { month: "Mar", 2023: 70, 2024: 80 },
    { month: "Apr", 2023: 65, 2024: 81 },
    { month: "May", 2023: 75, 2024: 56 },
    { month: "Jun", 2023: 80, 2024: 55 },
    { month: "Jul", 2023: 85, 2024: 40 },
    { month: "Aug", 2023: 70, 2024: 42 },
    { month: "Sep", 2023: 60, 2024: 67 },
    { month: "Oct", 2023: 50, 2024: 76 },
    { month: "Nov", 2023: 45, 2024: 70 },
    { month: "Dec", 2023: 55, 2024: 90 },
  ];

  const handleLegendClick = (event) => {
    const { dataKey } = event;
    setLineStatus((prevStatus) => ({
      ...prevStatus,
      [dataKey]: !prevStatus[dataKey],
    }));
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tick={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
            fill: "#000000",
          }}
        />
        <YAxis
          tick={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
            fill: "#000000",
          }}
        />
        <Tooltip
          contentStyle={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
            color: "#000000",
          }}
          labelStyle={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
            color: "#000000",
          }}
        />
        <Legend
          onClick={handleLegendClick}
          wrapperStyle={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.875rem", // equivalent to 'font-sm'
          }}
          verticalAlign="top"
          formatter={(value) => (lineStatus[value] ? value : "---")}
        />
        <Line
          type="monotone"
          dataKey="2023"
          stroke="rgba(255, 99, 132, 1)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          opacity={lineStatus["2023"] ? 1 : 0.2}
        />
        <Line
          type="monotone"
          dataKey="2024"
          stroke="rgba(75, 192, 192, 1)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          opacity={lineStatus["2024"] ? 1 : 0.2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OrdersOverTime;
