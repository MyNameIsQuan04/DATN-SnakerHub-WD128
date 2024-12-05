import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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

export interface MonthlyRevenue {
  month: number;
  year: number;
  monthly_total: string;
}

export interface Monthly {
  monthlyRevenue: MonthlyRevenue[];
  totalRevenue: string;
  startDate: string;
  endDate: string;
}

const MonthlyRevenueChart: React.FC = () => {
  const [data, setData] = useState<Monthly | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard/monthly")
      .then((response) => {
        if (response.data.success && response.data.monthlyRevenue) {
          setData(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
      })
      .catch((error) => {
        console.error("Error fetching monthly revenue:", error);
        setError("Failed to fetch monthly revenue");
      });
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  const chartData = {
    labels:
      data?.monthlyRevenue.map((item) => `${item.month}-${item.year}`) || [],
    datasets: [
      {
        label: "Doanh thu hàng tháng",
        data:
          data?.monthlyRevenue.map((item) => parseFloat(item.monthly_total)) ||
          [],
        backgroundColor: "rgba(75,192,192,0.7)", // Màu nền cho cột
        borderColor: "rgba(75,192,192,1)", // Màu viền cho cột
        borderWidth: 1, // Độ rộng viền của cột
        barThickness: 20, // Giảm độ rộng của cột (tùy chỉnh giá trị này để cột nhỏ lại)
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${
              tooltipItem.label
            }: ${tooltipItem.raw.toLocaleString()} VNĐ`;
          },
        },
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        grid: {
          borderColor: "rgba(75,192,192,0.2)",
        },
        ticks: {
          callback: function (value: number) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 bg-gray-50 rounded-lg shadow-lg min-h-[600px]">
      <div className="lg:w-[35%] w-full p-4 bg-white rounded-lg shadow-md mb-6 lg:mb-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Tổng quan
        </h3>
        {data && (
          <div>
            <p className="text-gray-600">
              <strong className="font-semibold">Tổng doanh thu:</strong>{" "}
              {parseFloat(data.totalRevenue).toLocaleString()} VNĐ
            </p>
            <p className="text-gray-600">
              <strong className="font-semibold">Ngày bắt đầu:</strong>{" "}
              {new Date(data.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong className="font-semibold">Ngày kết thúc:</strong>{" "}
              {new Date(data.endDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      <div className="lg:w-[65%] w-full p-4">
        <h1 className="pb-4 font-normal text-[20px]">Thống kê theo tháng</h1>
        <div className="h-[400px] lg:h-[500px] p-4 rounded-lg shadow-lg bg-white">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
