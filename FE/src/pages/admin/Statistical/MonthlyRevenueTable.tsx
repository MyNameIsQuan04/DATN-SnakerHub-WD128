/* eslint-disable react-hooks/rules-of-hooks */
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
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [dashboardData, setDashboardData] = useState({
    totalStocks: 0,
    totalSells: 0,
    countCustomer: 0,
    countOrder: 0,
    countOrderDone: 0,
    countOrderDestroy1: 0,
    countOrderDestroy2: 0,
    countOrderDestroy3: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setDashboardData({
            totalSells: result.totalSells,
            totalStocks: result.totalStocks,
            countCustomer: result.countCustomer,
            countOrder: result.countOrder,
            countOrderDone: result.countOrderDone,
            countOrderDestroy1: result.countOrderDestroy1,
            countOrderDestroy2: result.countOrderDestroy2,
            countOrderDestroy3: result.countOrderDestroy3,
          });
        } else {
          throw new Error("Invalid data format received");
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to fetch dashboard data");
      });
  }, []);

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
    return (
      <div className="text-red-500 text-center font-medium p-4">{error}</div>
    );
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleReset = () => {
    setSelectedYear(new Date().getFullYear());
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const filteredData = data?.monthlyRevenue.filter(
    (item) => item.year === selectedYear
  );

  const chartData = {
    labels: months.map((month) => `${month}-${selectedYear}`),
    datasets: [
      {
        label: "Doanh thu hàng tháng",
        data: months.map((month) => {
          const revenue = filteredData?.find((item) => item.month === month);
          return revenue ? parseFloat(revenue.monthly_total) : 0;
        }),
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
        mode: "index",
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
      <div className="lg:w-[35%] w-full p-8 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg border border-gray-300 mb-6 lg:mb-0">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-4">
          Tổng quan
        </h3>
        {data && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-700">
                Tổng doanh thu:
              </span>
              <span className="text-green-600 font-bold text-2xl">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(parseFloat(data.totalRevenue))}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-700">
                Tổng số sản phẩm:
              </span>
              <span className="text-blue-600 font-medium text-xl">
                {dashboardData.totalStocks}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-700">
                Sản phẩm đã bán:
              </span>
              <span className="text-blue-500 font-medium text-xl">
                {dashboardData.totalSells}
              </span>
            </div>
            {/* <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-700">
                Tháng bắt đầu:
              </span>
              <span className="text-gray-600 text-lg">
                {new Date(data.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-700">
                Tháng kết thúc:
              </span>
              <span className="text-gray-600 text-lg">
                {new Date(data.endDate).toLocaleDateString()}
              </span>
            </div> */}
          </div>
        )}
      </div>

      <div className="lg:w-[65%] w-full p-4">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800">
          Thống kê theo ngày
        </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <select
                id="year-select"
                value={selectedYear}
                onChange={handleYearChange}
                className="w-34 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {[...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Làm mới
            </button>
          </div>
        </div>
        <div className="h-[400px] lg:h-[500px] p-4 rounded-lg shadow-lg bg-white">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;