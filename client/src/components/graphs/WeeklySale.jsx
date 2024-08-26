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
    <>
      <div className="flex flex-col gap-5 px-5">
        <h3 className="text-base font-semibold">Weekly Sales</h3>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">1,259</span>
          <span className="text-xs">Items Sold</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">₱12,546</span>
          <span className="text-xs">Revenue</span>
        </div>
      </div>
      <div className="px-5">
        <hr className="border-t border-dashed" />
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
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
            barSize={13}
            radius={[20, 20, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default WeeklySale;
