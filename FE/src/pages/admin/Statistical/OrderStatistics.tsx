import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

interface OrderStats {
  countOrderDestroy1: number;
  countOrderDestroy2: number;
  countOrderDestroy3: number;
}

const OrderStatistics: React.FC = () => {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dashboard");
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Dữ liệu cho biểu đồ
  const data = {
    labels: [
      "Giao hàng không đúng yêu cầu",
      "Sản phẩm có lỗi từ nhà cung cấp",
      "Lý do khác",
    ], // Nhãn cho các lý do hủy
    datasets: [
      {
        label: "Số đơn hủy",
        data: [
          stats?.countOrderDestroy1 || 0,
          stats?.countOrderDestroy2 || 0,
          stats?.countOrderDestroy3 || 0,
        ],
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF"], // Màu sắc cho các cột
        borderColor: ["#FF5733", "#33FF57", "#3357FF"],
        borderWidth: 1,
      },
    ],
  };

  // Tùy chọn cấu hình cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Thống kê số đơn hàng hủy theo lý do",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrderStatistics;
