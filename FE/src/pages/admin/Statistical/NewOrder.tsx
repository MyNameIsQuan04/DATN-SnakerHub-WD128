import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Order } from "../../../interfaces/Order";

const NewOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const ordersPerPage = 5;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard")
      .then((response) => {
        setLoading(false);
        if (response.data.success && response.data.orders) {
          setOrders(response.data.orders);
          setFilteredOrders(response.data.orders);
        } else {
          setError("Không có đơn hàng mới.");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Lỗi khi tải đơn hàng:", error);
        setError("Lỗi khi tải đơn hàng.");
      });
  }, []);

  // Lọc danh sách đơn hàng theo trạng thái
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setSelectedStatus(status);
    setCurrentPage(1);
    filterOrders(status, selectedDate);
  };

  // Lọc danh sách đơn hàng theo ngày
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    setCurrentPage(1);
    filterOrders(selectedStatus, date);
  };

  // Reset về trạng thái tất cả đơn hàng
  const handleReset = () => {
    setSelectedStatus("");
    setSelectedDate("");
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  // Lọc đơn hàng theo trạng thái và ngày
  const filterOrders = (status: string, date: string) => {
    let filtered = orders;
    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }
    if (date) {
      filtered = filtered.filter(
        (order) =>
          new Date(order.created_at).toISOString().split("T")[0] === date
      );
    }
    setFilteredOrders(filtered);
  };

  // Tính toán chỉ số bắt đầu và kết thúc dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Các đơn hàng mới</h2>
        <div className="flex items-center space-x-2">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Tất cả</option>
            <option value="Chờ xử lý">Chờ xử lý</option>
            <option value="Đã xác nhận">Đã xác nhận</option>
            <option value="Đang vận chuyển">Đang vận chuyển</option>
            <option value="Đã giao hàng">Đã giao hàng</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Trả hàng">Trả hàng</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-400 transition"
          >
            Làm mới
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto min-h-[280px]">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                    Mã đơn hàng
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                    Trạng thái
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                    Thanh toán
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                    Tổng tiền
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                    Phí vận chuyển
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                    Ghi chú
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td className="border border-gray-200 px-4 py-2">
                        <Link
                          to={`/admin/order-detail/${order.id}`}
                          className="text-center"
                        >
                          {order.order_code}
                        </Link>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {order.status}
                      </td>
                      {order.paymentMethod === "VNPAY" ? (
                        <td className="border border-gray-200 px-4 py-2">
                          <img
                            src="https://i.imgur.com/RAtc2Se.png"
                            alt="VNPay"
                            className="inline-block w-10 h-10 object-cover"
                          />
                          {order.paymentMethod}
                        </td>
                      ) : (
                        <td className="border border-gray-200 px-4 py-2 text-red-500 font-semibold">
                          {order.paymentMethod}
                        </td>
                      )}

                      <td className="border border-gray-200 px-4 py-2 text-green-600 font-bold">
                        {order.totalAfterDiscount.toLocaleString()} VND
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <Link
                          to={`/admin/order-detail/${order.id}`}
                          className="text-blue-500 text-center"
                        >
                          Xem chi tiết
                        </Link>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {order.note}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-gray-500 font-semibold"
                    >
                      Không có đơn hàng...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-start items-center mt-4 space-x-2">
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Trang trước
            </button>
            <span className="text-gray-700 font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewOrder;
