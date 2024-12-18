import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Order } from "../../../interfaces/Order";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, filterStatus, orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        },
      });
      setOrders(data);
      setFilteredOrders(data);
      setError(""); // Reset error
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Tải dữ liệu thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Nếu không có trạng thái cụ thể (tất cả), loại bỏ trạng thái "Yêu cầu trả hàng"
    if (!filterStatus) {
      filtered = filtered.filter(
        (order) =>
          order.status !== "Yêu cầu trả hàng" &&
          order.status !== "Xử lý yêu cầu trả hàng"
      );
    } else {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.order_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(order.customer.phone_number).includes(searchTerm)
      );
    }

    setFilteredOrders(filtered);
  };

  const getStatusButtons = () => [
    { label: "Tất cả", value: "" },
    { label: "Chờ xử lý", value: "Chờ xử lý" },
    { label: "Đã xác nhận", value: "Đã xác nhận" },
    { label: "Đang vận chuyển", value: "Đang vận chuyển" },
    { label: "Đã giao hàng", value: "Đã giao hàng" },
    { label: "Hoàn thành", value: "Hoàn thành" },
    { label: "Đã hủy", value: "Đã hủy" },
    { label: "Trả hàng", value: "Trả hàng" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 bg-white shadow-lg z-10 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Quản lý đơn hàng
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3 transition duration-300 focus:ring-2 focus:ring-yellow-500"
          />
          <Link to={`/admin/order-return`}>
            <button className="mt-4 md:mt-0 px-4 py-2 rounded-md border text-sm bg-gray-500 text-white border-gray-500 hover:bg-gray-600 transition duration-200">
              Yêu cầu / Khiếu nại
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {getStatusButtons().map((status) => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`px-4 py-2 rounded-md border text-sm transition duration-200 
                ${
                  filterStatus === status.value
                    ? "bg-gray-500 text-white border-gray-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-[60vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Đang tải lịch sử đơn hàng ....
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="mt-4 text-center text-red-500 font-semibold">
          {error}
        </div>
      )}

      {filteredOrders.length === 0 && !loading && !error && (
        <div className="mt-4 text-center text-gray-500 font-semibold">
          Không có đơn hàng nào.
        </div>
      )}

      {filteredOrders.length > 0 && !loading && !error && (
        <div className="overflow-y-auto mt-4" style={{ maxHeight: "540px" }}>
          <table className="min-w-full bg-white border border-gray-100 shadow-md">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-center">
                {[...Array(7)].map((_, i) => (
                  <th
                    key={i}
                    className="py-2 px-5 border border-gray-300 font-semibold text-gray-600 rounded-lg"
                  >
                    {
                      [
                        "Mã đơn hàng",
                        "Thông tin",
                        "Tổng tiền",
                        "Phương thức thanh toán ",
                        "Trạng thái",
                        "Chi tiết",
                      ][i]
                    }
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((item: Order) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out">
                    <td className="py-3 px-4 border-b text-center text-blue-500">
                      #{item.order_code}
                    </td>
                    <td className="py-3 px-4 border-b text-center flex flex-col">
                      <p className="text-red-500">{item.customer.name}</p>
                      <p>{item.customer.phone_number}</p>
                      {/* , {item.customer.address} */}
                    </td>
                    <td className="py-3 px-4 border-b text-center text-red-500 font-medium">
                      {item.totalAfterDiscount.toLocaleString()} VNĐ
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {item.paymentMethod === "COD" ? (
                        <span className="text-yellow-500 font-bold">COD</span>
                      ) : item.paymentMethod === "VNPAY" ? (
                        <img
                          src="https://i.imgur.com/RAtc2Se.png"
                          alt="VNPay"
                          className="inline-block w-10 h-10 object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 font-semibold">
                          Khác
                        </span>
                      )}
                    </td>

                    <td
                      className={`py-3 px-4 border-b text-center font-semibold ${
                        item.status === "Chờ xử lý" ||
                        item.status === "Đã xác nhận"
                          ? "text-yellow-500"
                          : item.status === "Đã hủy"
                          ? "text-red-500"
                          : item.status === "Hoàn thành"
                          ? "text-green-500"
                          : item.status === "Đang vận chuyển" ||
                            item.status === "Trả hàng"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    >
                      {item.status}
                    </td>

                    <td className="border-b text-center">
                      <Link to={`/admin/order-detail/${item.id}`}>
                        <button className="text-white bg-gray-400 px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-gray-500 focus:outline-none whitespace-nowrap underline">
                          Chi tiết
                        </button>
                      </Link>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminOrder;
