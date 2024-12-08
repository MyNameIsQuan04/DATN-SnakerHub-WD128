import { useEffect, useState } from "react";
import axios from "axios";
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

export interface DailyRevenue {
  date: string;
  daily_total: string;
}

export interface Daily {
  dailyRevenue: DailyRevenue[];
  totalRevenue: string;
  startDate: string;
  endDate: string;
}

const DailyRevenueChart: React.FC = () => {
  const [data, setData] = useState<Daily | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard/daily")
      .then((response) => {
        if (response.data.success) {
          setData(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
      })
      .catch((error) => {
        console.error("Error fetching daily revenue:", error);
        setError("Failed to fetch daily revenue");
      });
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  const chartData = {
    labels: data?.dailyRevenue.map((item) => item.date) || [],
    datasets: [
      {
        label: "Doanh thu hàng ngày",
        data:
          data?.dailyRevenue.map((item) => parseFloat(item.daily_total)) || [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)", // Nền nhạt cho biểu đồ
        fill: true, // Tô màu nền dưới đường biểu đồ
        tension: 0.4, // Điều chỉnh độ cong của đường biểu đồ
        pointBackgroundColor: "rgba(75,192,192,1)", // Màu điểm trên biểu đồ
        pointBorderColor: "rgba(0,0,0,0.8)",
        pointBorderWidth: 2,
        pointRadius: 6, // Tăng kích thước điểm
        pointHoverRadius: 8, // Kích thước điểm khi hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            if (value % 1000 === 0) {
              return value.toLocaleString();
            }
            return "";
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center px-4 py-2 border-b-2 border-gray-300">
        Thống kê doanh thu theo từng ngày
      </h2>

      <div className="p-2 rounded-lg shadow-lg">
        <Line data={chartData} options={options} />
      </div>

      {data && (
        <div className="mt-6 px-4 py-6 bg-white rounded-lg shadow-md">
          <ul className="space-y-2 text-gray-700">
            <strong className="block text-xl font-semibold text-gray-800 mb-2">
              Chi tiết doanh thu từng ngày:
            </strong>
            {data.dailyRevenue.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-lg font-medium text-gray-600"
              >
                <span>Ngày {item.date}:</span>
                <span className="text-green-600 font-semibold">
                  {parseFloat(item.daily_total).toLocaleString()} VNĐ
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DailyRevenueChart;
