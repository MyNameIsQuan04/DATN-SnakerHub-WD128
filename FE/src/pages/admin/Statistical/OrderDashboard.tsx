import { useEffect, useState } from "react";
import DailyRevenueChart from "./DailyRevenueTable";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { FaBoxOpen, FaShoppingCart, FaTasks, FaUserFriends, FaDollarSign } from "react-icons/fa";
import axios from "axios";
import { Monthly } from "./MonthlyRevenueTable";

const OrderDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    countCustomer: 0,
    countOrder: 0,
    countOrderDone: 0,
    totalStocks: 0,
    totalSells: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Monthly | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/dashboard");
        const result = await response.json();
        if (result.success) {
          setDashboardData({
            countCustomer: result.countCustomer,
            countOrder: result.countOrder,
            countOrderDone: result.countOrderDone,
            totalStocks: result.totalStocks,
            totalSells: result.totalSells,
          });
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to fetch dashboard data");
      }
    };

    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard/monthly");
        if (response.data.success && response.data.monthlyRevenue) {
          setData(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
        setError("Failed to fetch monthly revenue");
      }
    };

    fetchDashboardData();
    fetchMonthlyRevenue();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center font-medium p-4">{error}</div>;
  }

  const icons = [
    <FaBoxOpen className="text-3xl text-blue-500" />, // Smaller size
    <FaShoppingCart className="text-3xl text-green-500" />, // Smaller size
    <FaTasks className="text-3xl text-yellow-500" />, // Smaller size
    <FaDollarSign className="text-3xl text-purple-500" />, // Smaller size
    <FaUserFriends className="text-3xl text-pink-500" />, // Smaller size
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="ml-4 py-4">
        <h2 className="font-extrabold text-3xl text-gray-800">Bảng điều khiển</h2>
        <div className="flex items-center gap-2 ml-2 text-gray-600">
          <div className="flex items-center gap-1">
            <IoHomeOutline className="text-xl" />
            <GrFormNext className="text-lg" />
          </div>
          <h3 className="underline font-medium">Bảng điều khiển</h3>
        </div>
      </div>
      <div className="bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-4 rounded-xl text-center transform hover:scale-105 transition duration-300">
            <h2 className="text-lg font-semibold text-gray-600">Tổng doanh thu</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(parseFloat(data?.totalRevenue || "0"))}
            </p>
          </div>
          {[
            { label: "Tổng sản phẩm tồn kho", value: dashboardData.totalStocks },
            { label: "Tổng sản phẩm đã bán", value: dashboardData.totalSells },
            { label: "Đơn hàng đang xử lý", value: dashboardData.countOrder },
            { label: "Đơn hàng hoàn thành", value: dashboardData.countOrderDone },
            { label: "Khách hàng", value: dashboardData.countCustomer },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 rounded-xl text-center transform hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-2">{icons[index]}</div>
              <h2 className="text-lg font-semibold text-gray-600">{item.label}</h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 mb-5">
        <DailyRevenueChart />
      </div>
    </div>
  );
};

export default OrderDashboard;
