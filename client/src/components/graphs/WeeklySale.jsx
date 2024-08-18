import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklySale = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Revenue",
        data: [1200, 1500, 2000, 2525, 2800, 3000, 2800],
        backgroundColor: "rgb(74 222 128)",
        borderRadius: 20,
        hoverBackgroundColor: "rgb(22 163 74)",
        barPercentage: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `₱${tooltipItem.raw.toLocaleString()}`;
          },
        },
        bodyFont: {
          family: "Raleway, sans-serif",
          color: "#000000",
        },
        titleFont: {
          family: "Raleway, sans-serif",
          color: "#000000",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Week",
          font: {
            family: "Raleway, sans-serif",
            color: "#000000",
          },
        },
        ticks: {
          font: {
            family: "Raleway, sans-serif",
            color: "#000000",
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (₱)",
          font: {
            family: "Raleway, sans-serif",
            color: "#000000",
          },
        },
        ticks: {
          font: {
            family: "Raleway, sans-serif",
            color: "#000000",
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklySale;
