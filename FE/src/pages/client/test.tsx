import React, { useEffect, useState } from "react";
import { Order } from "../../interfaces/Order";
import axios from "axios";

const OrderHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchOrders = async () => {
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
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };
    fetchOrders();
  }, [token]);

  const getFilteredOrders = (status: string) => {
    if (status === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === status);
  };

  const renderTableContent = (filteredOrders: Order[]) => {
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Mã đơn hàng</th>
            <th className="border border-gray-300 p-4">Sản phẩm</th>
            <th className="border border-gray-300 p-4">Tổng giá</th>
            <th className="border border-gray-300 p-4">Trạng thái</th>
            <th className="border border-gray-300 p-4">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-300 p-4 text-center font-medium">
                  {order.id}
                </td>
                <td className="border border-gray-300 p-4">
                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center mb-4 border-b pb-2"
                    >
                      <img
                        src={item.product_variant.image}
                        alt={item.product_variant.sku}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <div className="font-semibold text-lg">
                          {item.product_variant.sku}
                        </div>
                        <div className="text-gray-500">
                          Màu: {item.product_variant.color.name}, Kích cỡ:{" "}
                          {item.product_variant.size.name}
                        </div>
                        <div>Số lượng: {item.quantity}</div>
                        <div className="text-red-600 font-semibold">
                          Giá: {item.price.toLocaleString()}₫
                        </div>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 p-4 text-center font-semibold text-green-600">
                  {order.total_price.toLocaleString()}₫
                </td>
                <td className="border border-gray-300 p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      order.status === "đang vận chuyển"
                        ? "bg-yellow-200 text-yellow-700"
                        : order.status === "hoàn thành"
                        ? "bg-green-200 text-green-700"
                        : order.status === "đã hủy"
                        ? "bg-red-200 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-4 text-center">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-6 text-gray-600">
                Không có đơn hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const filteredOrders = getFilteredOrders(activeTab);

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-4">
        {[
          "tất cả",
          "chờ xử lý",
          "đã xác nhận",
          "đang vận chuyển",
          "hoàn thành",
          "đã hủy",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded ${
              activeTab === status
                ? "bg-blue-500 text-white font-semibold"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {status === "all"
              ? "Tất cả"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">{renderTableContent(filteredOrders)}</div>
    </div>
  );
};

export default OrderHistory;
