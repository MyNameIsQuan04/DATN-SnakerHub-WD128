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
        localStorage.setItem("orders", JSON.stringify(response.data)); // Lưu vào localStorage
      } catch (error) {
        setError("Lỗi khi tải trạng thái đơn hàng.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

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

        const updatedOrders = orders.map((order) =>
          order.id === idOrder ? { ...order, status: "Đã hủy" } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders)); 
        localStorage.setItem("lastUpdate", `Đơn hàng ID ${idOrder} đã hủy`); 
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng:", error);
      }
    }
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-xl">
        {/* Tabs trạng thái */}
        <div className="flex justify-center mb-6">
          {[
            "all",
            "Chờ xử lý",
            "Đã xác nhận",
            "Đang vận chuyển",
            "Đã giao hàng",
            "Hoàn thành",
            "Đã hủy",
          ].map((status) => (
            <div
              key={status}
              className={`relative px-2 py-3 transition-all duration-300 ease-in-out ${
                selectedStatus === status
                  ? "border-b-2 border-orange-600 mt-6" 
                  : "hover:border-b-2 hover:border-orange-400 mt-6" 
              }`}
            >
              <button
                onClick={() => setSelectedStatus(status)}
                className={`w-full px-6 py-4 text-base font-medium transition-all duration-300 ease-in-out transform rounded-md ${
                  selectedStatus === status
                    ? "bg-orange-600 text-white scale-105" 
                    : "bg-gray-200 text-gray-800 hover:bg-orange-500 hover:text-white" 
                }`}
              >
                {status === "all" ? "Tất cả" : status}
              </button>
            </div>
          ))}
        </div>

        {loading && (
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
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-6">
                  {order.order_items.slice(0, 1).map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={
                          item.product_variant?.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Product"
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                      />
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold text-gray-700">
                          {item.product_variant?.product.name}
                        </p>
                        <div className="flex ">
                          <p className="text-lg text-gray-700">Loại hàng: </p>
                          <p className="text-lg text-gray-700">
                            {item.product_variant?.color.name || "Không có"}
                          </p>
                          <p className="text-lg text-gray-700">
                            {", "}
                            {item.product_variant?.size.name || "Không có"}
                          </p>
                        </div>
                        <p className="text-lg text-gray-700">
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right">
                  {/* Order Status */}
                  <p
                    className={`text-lg font-semibold px-2 py-1 inline-block ${
                      order.status === "Hoàn thành"
                        ? "text-green-600"
                        : order.status === "Đã hủy"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </p>
                  {/* Total Price */}
                  <p className="text-lg font-medium text-red-600">
                    Thành tiền:{" "}
                    <span className="font-medium">
                      {formatCurrency(order.total_price)} vnđ
                    </span>
                  </p>
                </div>
              </div>
              <hr />
              {/* Action Buttons */}
              <div className="flex justify-end gap-1 mt-4">
                {/* "Cancel Order" Button */}
                {["Chờ xử lý", "Đã xác nhận"].includes(order.status) && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                  >
                    Hủy đơn hàng
                  </button>
                )}
                {/* "View Order Details" Button */}
                <button
                  onClick={() => alert("Xem chi tiết đơn hàng")}
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Xem chi tiết đơn
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory;
