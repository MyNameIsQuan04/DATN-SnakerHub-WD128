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
    countOrderDestroy1: 0,
    countOrderDestroy2: 0,
    countOrderDestroy3: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard")
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, []);

  // Dữ liệu cho biểu đồ
  const data = {
    labels: [
      "Giao hàng không đúng yêu cầu",
      "Sản phẩm có lỗi từ nhà cung cấp",
      "Lý do khác",
    ],
    datasets: [
      {
        label: "Số lượng hủy",
        data: [
          dashboardData.countOrderDestroy1,
          dashboardData.countOrderDestroy2,
          dashboardData.countOrderDestroy3,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Cấu hình cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Thống kê lý do hủy đơn hàng",
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Thống kê lý do hủy đơn hàng
      </h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardChart;
