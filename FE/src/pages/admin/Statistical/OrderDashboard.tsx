import { useEffect, useState } from "react";
import DailyRevenueChart from "./DailyRevenueTable";
import List5Pro from "./List5Pro";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";


const OrderDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    countCustomer: 0,
    countOrder: 0,
    countOrderDone: 0,
    countOrderDestroy1: 0,
    countOrderDestroy2: 0,
    countOrderDestroy3: 0,
  });
  const [error, setError] = useState< string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard")
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setDashboardData({
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

  if (error) {
    return (
      <div className="text-red-500 text-center font-medium p-4">{error}</div>
    );
  }

  return (
    <div>
      <div className="ml-4">
        <h2 className="font-bold text-[30px]">Bảng điều khiển</h2>
        <div className="flex items-center gap-2 ml-2">
          <div className="flex gap-1">
          <IoHomeOutline/> 
          <GrFormNext/>
          </div>
          <h3 className="underline">Bảng điều khiển</h3>
        </div>
      </div>
      <div className="bg-gray-100 min-h-48 flex items-center justify-center py-4">
        <div className="flex justify-between gap-6 w-full max-w-6xl px-4">
          <div className="bg-white shadow-md p-6 rounded-md text-center flex-1 min-w-[150px] hover:shadow-xl hover:bg-gray-100 active:shadow-inner active:bg-gray-200 transform hover:scale-105 active:scale-95 transition duration-300 ease-out">
            <h2 className="text-lg font-medium text-gray-700">Khách hàng</h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {dashboardData.countCustomer}
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md text-center flex-1 min-w-[150px] hover:shadow-xl hover:bg-gray-100 active:shadow-inner active:bg-gray-200 transform hover:scale-105 active:scale-95 transition duration-300 ease-out">
            <h2 className="text-lg font-medium text-gray-700">
              Đơn hàng đang xử lý
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {dashboardData.countOrder}
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md text-center flex-1 min-w-[150px] hover:shadow-xl hover:bg-gray-100 active:shadow-inner active:bg-gray-200 transform hover:scale-105 active:scale-95 transition duration-300 ease-out">
            <h2 className="text-lg font-medium text-gray-700">
              Đơn hàng hoàn thành
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {dashboardData.countOrderDone}
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md text-center flex-1 min-w-[150px] hover:shadow-xl hover:bg-gray-100 active:shadow-inner active:bg-gray-200 transform hover:scale-105 active:scale-95 transition duration-300 ease-out">
            <h2 className="text-lg font-medium text-gray-700">
              Hủy: Không đúng yêu cầu
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {dashboardData.countOrderDestroy1}
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md text-center flex-1 min-w-[150px] hover:shadow-xl hover:bg-gray-100 active:shadow-inner active:bg-gray-200 transform hover:scale-105 active:scale-95 transition duration-300 ease-out">
            <h2 className="text-lg font-medium text-gray-700">
              Hủy: Lỗi từ nhà cung cấp
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {dashboardData.countOrderDestroy2}
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md text-center flex-1 min-w-[150px] hover:shadow-xl hover:bg-gray-100 active:shadow-inner active:bg-gray-200 transform hover:scale-105 active:scale-95 transition duration-300 ease-out">
            <h2 className="text-lg font-medium text-gray-700">
              Hủy: Lý do khác
            </h2>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {dashboardData.countOrderDestroy3}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-[55%] p-4 ">
          <DailyRevenueChart />
        </div>
        <div className="w-[45%] p-4">
          <List5Pro/>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
