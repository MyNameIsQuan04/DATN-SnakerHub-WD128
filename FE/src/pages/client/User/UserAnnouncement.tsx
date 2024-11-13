import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Order } from "../../../interfaces/Order";

const UserAnnouncement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/client/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  // Hàm chuyển đổi thời gian sang định dạng dễ đọc
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleOrderClick = () => {
    // navigate(`/profile/order-history/${orderId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Thông báo</h2>

      {loading ? (
        <div className="text-center text-xl text-blue-500">
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 text-base font-semibold text-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 disabled:opacity-70"
          disabled={loading}
        >
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"
            role="status"
          />
          <span>Loading...</span>
        </button>
      </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-start bg-white p-4 rounded-lg shadow-md border cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50"
              onClick={() => handleOrderClick()}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={order.order_items[0]?.product_variant?.image || "https://via.placeholder.com/100"}
                  alt="Order Thumbnail"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">Đơn hàng ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Tên sản phẩm: {order.order_items[0]?.product_variant?.product?.name || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p
                  className={`text-lg font-medium ${
                    order.status === "Đã hủy" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  Trạng thái: {order.status}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Cập nhật lần cuối: {formatDate(order.updated_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAnnouncement;
