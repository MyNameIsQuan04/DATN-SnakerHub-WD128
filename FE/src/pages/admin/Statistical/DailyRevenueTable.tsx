import { useEffect, useState } from "react";
import axios from "axios";
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
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const getLast7Days = (startDate: Date) => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(startDate);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const DailyRevenueChart: React.FC = () => {
  const [data, setData] = useState<Daily | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(0); // 0 means current week
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

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

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(parseInt(event.target.value, 10));
    setSelectedStartDate(null); // Reset selected start date when week is changed
    setSelectedEndDate(null); // Reset selected end date when week is changed
  };

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
    setSelectedWeek(0); // Reset selected week when date is changed
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
    setSelectedWeek(0); // Reset selected week when date is changed
  };

  const handleReset = () => {
    setSelectedWeek(0);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - selectedWeek * 7);
  const last7Days = getLast7Days(startDate);

  const filteredData = selectedStartDate && selectedEndDate
    ? data?.dailyRevenue.filter(
        (item) =>
          new Date(item.date) >= selectedStartDate &&
          new Date(item.date) <= selectedEndDate
      )
    : data?.dailyRevenue.filter((item) => last7Days.includes(item.date));

  const chartData = {
    labels: selectedStartDate && selectedEndDate
      ? filteredData?.map((item) => item.date) || []
      : last7Days,
    datasets: [
      {
        label: "Doanh thu hàng ngày",
        data: selectedStartDate && selectedEndDate
          ? filteredData?.map((item) => parseFloat(item.daily_total)) || [0]
          : last7Days.map((date) => {
              const revenue = filteredData?.find((item) => item.date === date);
              return revenue ? parseFloat(revenue.daily_total) : 0;
            }),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        barThickness: 20, // Adjust this value to make the columns narrower
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
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Thống kê các ngày trong tuần
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <select
              id="week-select"
              value={selectedWeek}
              onChange={handleWeekChange}
              className="w-34 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={0}>Tuần này</option>
              <option value={1}>Tuần trước</option>
              <option value={2}>2 tuần trước</option>
              <option value={3}>3 tuần trước</option>
              <option value={4}>4 tuần trước</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="date"
              placeholder="Ngày bắt đầu"
              value={
                selectedStartDate ? selectedStartDate.toISOString().split("T")[0] : ""
              }
              onChange={(e) =>
                handleStartDateChange(
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              className="w-34 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="date"
              placeholder="Ngày kết thúc"
              value={
                selectedEndDate ? selectedEndDate.toISOString().split("T")[0] : ""
              }
              onChange={(e) =>
                handleEndDateChange(
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              className="w-34 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Làm mới
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-3/5 p-4 rounded-lg shadow-lg bg-gray-50">
          <Bar data={chartData} options={options} />
        </div>

        <div className="w-2/5 mt-6 px-4 py-6 bg-white rounded-lg shadow-md ml-4">
          <ul className="space-y-2 text-gray-700">
            <strong className="block text-xl font-semibold text-gray-800 mb-4">
              Chi tiết doanh thu 
            </strong>
            {filteredData?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-lg font-medium text-gray-600 bg-gray-100 p-2 rounded-md hover:bg-gray-200"
              >
                <span>{item.date}:</span>
                <span className="text-green-600 font-semibold">
                  {parseFloat(item.daily_total).toLocaleString()} VNĐ
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DailyRevenueChart;