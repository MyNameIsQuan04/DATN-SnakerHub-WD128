import React, { useEffect, useState } from "react";
import { Order } from "../../../interfaces/Order";
import axios from "axios";


const formatCurrency = (amount: number) => {
  if (amount === undefined || amount === null) {
    return "0"; // Trả về giá trị mặc định nếu amount không hợp lệ
  }
  return amount.toLocaleString("vi-VN"); // Format với dấu phân cách cho số
};

const UserOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/client/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        setError("Lỗi khi tải trạng thái đơn hàng.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  // Lọc đơn hàng theo trạng thái đã chọn
  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  // Hàm hủy đơn hàng
  const cancelOrder = async (orderId: number) => {
    try {
      await axios.put(
        `http://localhost:8000/api/client/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Cập nhật lại danh sách đơn hàng sau khi hủy
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "đã hủy" } : order
        )
      );
      alert("Đơn hàng đã được hủy.");
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert("Không thể hủy đơn hàng.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl">
        {/* Tabs trạng thái */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            "all",
            "Chờ xử lý",
            "Đã xác nhận",
            "Đang vận chuyển",
            "Đã giao hàng",
            "Hoàn thành",
            "Đã hủy",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-3 text-lg font-semibold transition-all duration-300 transform rounded-[20px] border-2 ${
                selectedStatus === status
                  ? "bg-orange-500 text-white border-orange-500 scale-105"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-orange-400 hover:text-white"
              }`}
            >
              {status === "all" ? "Tất cả" : status}
            </button>
          ))}
        </div>

        
        {loading && (
          <div className="text-center text-xl text-blue-500">
            <span className="spinner-border animate-spin"></span> Đang tải đơn
            hàng...
          </div>
        )}

        {/* Hiển thị lỗi khi không thể tải đơn hàng */}
        {error && <p className="text-center text-xl text-red-500">{error}</p>}

        {/* Hiển thị các đơn hàng đã lọc */}
        {filteredOrders.length === 0 && !loading ? (
          <p className="text-center text-xl text-gray-500">
            Không có đơn hàng.
          </p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Order Header: Date, Price, and Status */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Ngày tạo: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-semibold text-red-600">
                    Tổng tiền:{" "}
                    <span className="font-bold">
                      {formatCurrency(order.total_price)} đ
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800">
                    Trạng thái:
                    <span
                      className={`font-bold ${
                        order.status === "hoàn thành"
                          ? "text-green-600"
                          : order.status === "đã hủy"
                          ? "text-red-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  {/* Conditional Cancel Button */}
                  {["Chờ xử lý", "Đã xác nhận"].includes(order.status) && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="ml-4 px-6 py-2 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>

              {/* Order Customer Information */}
              <div className="mb-6">
                <p className="text-lg text-gray-700">
                  Khách hàng:{" "}
                  <span className="font-semibold">{order.customer.name}</span>
                </p>
                <p className="text-lg text-gray-700">
                  Địa chỉ: {order.customer.address}
                </p>
                <p className="text-lg text-gray-700">
                  Số điện thoại: {order.customer.phone_number}
                </p>
              </div>

              {/* Order Items */}
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                Chi tiết sản phẩm:
              </h3>
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 mt-4 border-t pt-4"
                >
                  <img
                    src={
                      item.product_variant?.image ||
                      "https://via.placeholder.com/150" // Hình ảnh mặc định nếu không có
                    }
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg text-gray-700">
                      Số lượng: {item.quantity}
                    </p>
                    <p className="text-lg text-gray-700">
                      Giá:{" "}
                      <span className="font-bold text-gray-900">
                        {formatCurrency(item.price)} đ
                      </span>
                    </p>
                    <p className="text-lg text-gray-700">
                      Giá sản phẩm:{" "}
                      <span className="font-bold text-gray-900">
                        {formatCurrency(item.product_variant?.price)} đ
                      </span>
                    </p>
                    <p className="text-lg text-gray-700">
                      Màu sắc: {item.product_variant?.color.name || "Không có"}
                    </p>
                    <p className="text-lg text-gray-700">
                      Kích thước: {item.product_variant?.size.name || "Không có"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory;
