import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "../css/RevenueChart.css";

// Import Chart.js modules and register them
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        backgroundColor: "rgba(24, 144, 255, 0.6)",
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user may not be authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/admin/recent-revenue", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Debugging: Log the API response
        console.log("API Response:", response.data);

        // Ensure response.data is an array
        const data = Array.isArray(response.data) ? response.data : [];

        // Extract labels and totals
        const labels = data.map((item) => item._id || ""); // Fallback to empty string if _id is missing
        const totals = data.map((item) => item.total || 0); // Fallback to 0 if total is missing

        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue",
              data: totals,
              backgroundColor: "rgba(24, 144, 255, 0.6)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Recent Revenue",
      },
    },
  };

  if (loading) {
    return <div className="chart-loading">Loading chart...</div>;
  }

  return (
    <div className="revenue-chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
