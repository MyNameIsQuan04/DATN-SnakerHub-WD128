import React, { useEffect, useState } from "react";
import { Order } from "../../../interfaces/Order";
import axios from "axios";


const UserOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/client/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Lỗi khi tải trạng thái đơn hàng:", error);
      }
    };
    fetchOrders();
  }, [token]);

  // Lọc đơn hàng theo trạng thái đã chọn
  const filteredOrders = selectedStatus === "all"
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className=" min-h-screen ">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-xl">
        {/* <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Lịch sử đơn hàng</h1> */}

        {/* Tabs trạng thái */}
        <div className="flex justify-center gap-0 mb-8">
          {["all", "chờ xử lý", "đã xác nhận", "đang vận chuyển", "hoàn thành", "đã hủy"].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                selectedStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
              } border border-gray-300 rounded-none first:rounded-l-lg last:rounded-r-lg`}
            >
              {status === "all" ? "Tất cả" : status}
            </button>
          ))}
        </div>

        {/* Hiển thị các đơn hàng đã lọc */}
        {filteredOrders.length === 0 ? (
          <p className="text-center text-xl text-gray-500">Không có đơn hàng.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <p className="text-lg font-semibold text-gray-800">Ngày tạo: {new Date(order.created_at).toLocaleDateString()}</p>
                <p className="text-lg font-semibold text-gray-800">Tổng tiền: {order.total_price} đ</p>
              </div>
              <div className="mb-4">
                <p className="text-lg text-gray-700">Khách hàng: {order.customer.name}</p>
                <p className="text-lg text-gray-700">Địa chỉ: {order.customer.address}</p>
                <p className="text-lg text-gray-700">Số điện thoại: {order.customer.phone_number}</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">Trạng thái: 
                <span className={`font-bold ${order.status === "hoàn thành" ? "text-green-600" : order.status === "đã hủy" ? "text-red-600" : "text-yellow-500"}`}>
                  {order.status}
                </span>
              </p>

              <h3 className="mt-6 text-xl font-semibold text-gray-800">Chi tiết sản phẩm:</h3>
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center gap-6 mt-4 border-t pt-4">
                  <img src={item.product_variant.image} alt="Product" className="w-28 h-28 object-cover rounded-lg shadow-md" />
                  <div className="flex flex-col">
                    <p className="text-lg text-gray-700">Số lượng: {item.quantity}</p>
                    <p className="text-lg text-gray-700">Giá: {item.price} đ</p>
                    <p className="text-lg text-gray-700">Giá sản phẩm: {item.product_variant.price} đ</p>
                    <p className="text-lg text-gray-700">Màu sắc: {item.product_variant.color.name}</p>
                    <p className="text-lg text-gray-700">Kích thước: {item.product_variant.size.name}</p>
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
