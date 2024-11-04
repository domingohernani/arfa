import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { startOfWeek, endOfToday } from "date-fns";
import { db } from "../../firebase/firebase";
import { formatToPeso } from "../globalFunctions";

const WeeklySale = ({ shopId }) => {
  const [data, setData] = useState([]);
  const [totalItemsSold, setTotalItemsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchWeeklyData = async () => {
    try {
      const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Assuming week starts on Monday
      const endOfCurrentDay = endOfToday();

      const ordersCollectionRef = collection(db, "orders");
      const ordersQuery = query(
        ordersCollectionRef,
        where("shopId", "==", shopId),
        where("createdAt", ">=", Timestamp.fromDate(startOfCurrentWeek)),
        where("createdAt", "<=", Timestamp.fromDate(endOfCurrentDay))
      );

      const ordersSnapshot = await getDocs(ordersQuery);

      const weeklyData = {
        Mon: { day: "Mon", revenue: 0, itemsSold: 0 },
        Tue: { day: "Tue", revenue: 0, itemsSold: 0 },
        Wed: { day: "Wed", revenue: 0, itemsSold: 0 },
        Thu: { day: "Thu", revenue: 0, itemsSold: 0 },
        Fri: { day: "Fri", revenue: 0, itemsSold: 0 },
        Sat: { day: "Sat", revenue: 0, itemsSold: 0 },
        Sun: { day: "Sun", revenue: 0, itemsSold: 0 },
      };

      let totalRevenue = 0;
      let totalItemsSold = 0;

      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        const createdAt = order.createdAt.toDate();
        const dayOfWeek = createdAt.toLocaleString("default", {
          weekday: "short",
        });
        const orderTotal = order.orderTotal || 0;
        const itemsSold = order.orderItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        // Update revenue and items sold for the day
        weeklyData[dayOfWeek].revenue += orderTotal;
        weeklyData[dayOfWeek].itemsSold += itemsSold;

        totalRevenue += orderTotal;
        totalItemsSold += itemsSold;
      });

      setData(Object.values(weeklyData));
      setTotalRevenue(totalRevenue);
      setTotalItemsSold(totalItemsSold);
    } catch (error) {
      console.error("Error fetching weekly sales data:", error);
    }
  };

  useEffect(() => {
    fetchWeeklyData();
  }, [shopId]);

  return (
    <>
      <div className="flex flex-col gap-5 px-5">
        <h3 className="text-base font-semibold">Weekly Sales</h3>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {totalItemsSold.toLocaleString()}
          </span>
          <span className="text-xs">Items Sold</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {formatToPeso(totalRevenue)}
          </span>
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
              fontSize: "0.875rem",
              fill: "#000000",
            }}
          />
          <YAxis
            tickFormatter={formatToPeso}
            tick={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "0.875rem",
              fill: "#000000",
            }}
          />
          <Tooltip
            formatter={(value) => formatToPeso(value)}
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
