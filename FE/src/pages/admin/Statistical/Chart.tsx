import React, { useEffect, useState } from "react";
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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    countCustomer: 0,
    countOrder: 0,
    countOrderDone: 0,
    countOrderDestroy: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard")
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, []);

  const data = {
    labels: [
      "Tài khoản",
      "Đơn chờ xử lý và xác nhận",
      "Đơn hoàn thành",
      "Đơn đã hủy",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [
          dashboardData.countCustomer,
          dashboardData.countOrder,
          dashboardData.countOrderDone,
          dashboardData.countOrderDestroy,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#F44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Dashboard Statistics",
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Thống kê đơn hàng và người dùng
      </h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardChart;
