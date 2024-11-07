import React, { useEffect, useState } from "react";
import { Order } from "../../interfaces/Order";
import axios from "axios";

const OrderHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tất cả");
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
    if (status === "Tất cả") {
      return orders;
    }
    return orders.filter((order) => order.status === status);
  };

  const handleCancelOrder = async (idOrder: number) => {
    const confirm = window.confirm("Bạn có muốn hủy đơn hàng này không");
    if (confirm) {
      try {
        await axios.patch(
          `http://localhost:8000/api/client/orders/${idOrder}`,
          { status: "Đã hủy" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === idOrder ? { ...order, status: "Đã hủy" } : order
          )
        );
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng:", error);
      }
    }
  };

  const renderOrderCard = (filteredOrders: Order[]) => {
    return filteredOrders.length > 0 ? (
      filteredOrders.map((order) => (
        <div
          key={order.id}
          className=" rounded-lg p-4 mb-4 shadow-sm bg-gray-50"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-lg">Mã đơn hàng: {order.id}</div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === "Đang vận chuyển"
                  ? "bg-yellow-200 text-yellow-700"
                  : order.status === "Đã giao hàng"
                  ? "bg-red-200 text- text-red-500"
                  : order.status === "Hoàn thành"
                  ? "bg-green-200 text-green-700"
                  : order.status === "Đã hủy"
                  ? "bg-red-200 text-red-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {order.status}
            </div>
          </div>

          <div className="mb-4">
            {order.order_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-4 border-b pb-4"
              >
                <img
                  src={item.product_variant.image}
                  alt={item.product_variant.sku}
                  className="w-20 h-20 object-cover rounded mr-4"
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
                    Giá: {item.price.toLocaleString()}đ
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right font-semibold text-xl text-red-700">
            Tổng giá: {order.total_price.toLocaleString()}đ
          </div>
          <div className="text-gray-500 text-sm mt-2">
            Ngày tạo: {new Date(order.created_at).toLocaleDateString()}
          </div>
          {(order.status === "Chờ xử lý" || order.status === "Đã xác nhận") && (
            <button
              onClick={() => handleCancelOrder(order.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Hủy đơn hàng
            </button>
          )}
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center rounded-lg p-4 mb-4 shadow-sm bg-gray-50">
        <img
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png"
          alt="No orders"
          className="w-[150px] h-[150px]"
        />
        <div className="text-gray-600 text-lg mt-[10px]">
          Không có đơn hàng nào
        </div>
      </div>
    );
  };

  const filteredOrders = getFilteredOrders(activeTab);

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-4 justify-center">
        {[
          "Tất cả",
          "Chờ xử lý",
          "Đã xác nhận",
          "Đang vận chuyển",
          "Đã giao hàng",
          "Hoàn thành",
          "Đã hủy",
        ].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-6 py-2 rounded-lg transition-all duration-200 shadow-md ${
              activeTab === status
                ? "bg-red-400 text-white font-semibold scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status === "tất cả"
              ? "Tất cả"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {renderOrderCard(filteredOrders)}
      </div>
    </div>
  );
};

export default OrderHistory;
