import React, { useState, useEffect } from "react";
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
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { startOfYear, endOfToday } from "date-fns";
import { db } from "../../firebase/firebase";
import { formatToPeso } from "../globalFunctions";

const OrdersOverTime = ({ shopId }) => {
  const [lineStatus, setLineStatus] = useState({
    2023: true,
    2024: true,
  });
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const ordersCollectionRef = collection(db, "orders");
      const startOfCurrentYear = startOfYear(new Date());
      const endOfCurrentDay = endOfToday();

      const ordersQuery = query(
        ordersCollectionRef,
        where("shopId", "==", shopId),
        where("orderStatus", "in", ["Delivered", "Picked-up"]),
        where("createdAt", ">=", Timestamp.fromDate(startOfCurrentYear)),
        where("createdAt", "<=", Timestamp.fromDate(endOfCurrentDay))
      );

      const ordersSnapshot = await getDocs(ordersQuery);

      const ordersData = {};

      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        const createdAt = order.createdAt.toDate();
        const year = createdAt.getFullYear();
        const month = createdAt.toLocaleString("default", { month: "short" });
        const orderTotal = order.orderTotal || 0;

        if (!ordersData[year]) ordersData[year] = {};
        if (!ordersData[year][month]) ordersData[year][month] = 0;

        ordersData[year][month] += orderTotal;
      });

      const formattedData = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].map((month) => ({
        month,
        2023: ordersData[2023]?.[month] || 0,
        2024: ordersData[2024]?.[month] || 0,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [shopId]);

  const handleLegendClick = (event) => {
    const { dataKey } = event;
    setLineStatus((prevStatus) => ({
      ...prevStatus,
      [dataKey]: !prevStatus[dataKey],
    }));
  };

  return (
    <>
      <div className="absolute">
        <h3 className="text-base font-semibold">
          Yearly Transactions Comparison
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 50, right: 40, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "0.875rem",
              fill: "#000000",
            }}
          />
          <YAxis
            tickFormatter={formatToPeso} // Format Y-axis values to peso
            tick={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "0.875rem",
              fill: "#000000",
            }}
          />
          <Tooltip
            formatter={(value) => formatToPeso(value)} // Format tooltip values to peso
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
          <Legend
            onClick={handleLegendClick}
            wrapperStyle={{
              fontFamily: "Raleway, sans-serif",
              fontSize: "0.875rem",
            }}
            verticalAlign="top"
            align="right"
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
    </>
  );
};

export default OrdersOverTime;
