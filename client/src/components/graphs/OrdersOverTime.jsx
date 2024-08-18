import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrdersOverTime = () => {
  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Data for 2023",
        data: [50, 60, 70, 65, 75, 80, 85, 70, 60, 50, 45, 55],
        fill: true,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
      {
        label: "Data for 2024",
        data: [65, 59, 80, 81, 56, 55, 40, 42, 67, 76, 70, 90],
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Raleway, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Line Chart for 2023 and 2024",
        font: {
          family: "Raleway, sans-serif",
        },
      },
      tooltip: {
        bodyFont: {
          family: "Raleway, sans-serif",
        },
        titleFont: {
          family: "Raleway, sans-serif",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "Raleway, sans-serif",
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "Raleway, sans-serif",
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default OrdersOverTime;
