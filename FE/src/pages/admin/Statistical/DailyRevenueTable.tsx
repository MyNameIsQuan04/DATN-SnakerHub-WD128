import { useEffect, useState } from "react";
import { DailyRevenue } from "../../../interfaces/Dashboard";

export interface Daily {
  dailyRevenue: DailyRevenue[];
  totalRevenue: string;
  startDate: string;
  endDate: string;
}

const DailyRevenueTable: React.FC = () => {
  const [data, setData] = useState<Daily | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/daily")
      .then((response) => response.json())
      .then((result) => {
        if (result.success && result.dailyRevenue) {
          setData(result);
        } else {
          throw new Error("Invalid data format received");
        }
      })
      .catch((error) => {
        console.error("Error fetching daily revenue:", error);
        setError("Failed to fetch daily revenue");
      });
  }, []);

  // Hàm định dạng tiền tệ Việt Nam
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(amount));
  };

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Thống kê doanh thu theo ngày
      </h2>

      {/* Bảng tổng quan */}
      {data && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Tổng quan
          </h3>
          <p className="text-gray-600">
            <strong className="font-semibold">Tổng doanh thu:</strong>{" "}
            {formatCurrency(data.totalRevenue)}
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

      {/* Bảng chi tiết hàng tháng */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white">
          <tr>
            <th className="border border-gray-300 p-3 text-left text-gray-700 font-semibold">
              Thời gian
            </th>
            <th className="border border-gray-300 p-3 text-left text-gray-700 font-semibold">
              Tổng doanh thu theo ngày
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.dailyRevenue.map((item, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="border border-gray-300 p-3 text-gray-700">
                {item.date}
              </td>
              <td className="border border-gray-300 p-3 text-gray-700 font-semibold text-red-600">
                {formatCurrency(item.daily_total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyRevenueTable;
