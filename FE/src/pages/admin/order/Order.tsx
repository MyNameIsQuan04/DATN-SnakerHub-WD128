import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Order } from "../../../interfaces/Order";

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/orders/${orderId}`,
        { status: newStatus }
      );
      if (response) {
        toast.success("Cập nhật trạng thái thành công!");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setOrders(orders); 
      toast.error("Cập nhật trạng thái thất bại !");
    }
  };

  const getStatusOptions = (currentStatus: string) => {
    const statusFlow = [
      "chờ xử lý",
      "đã xác nhận",
      "đang vận chuyển",
      "hoàn thành",
      "đã hủy",
    ];

    const currentIndex = statusFlow.indexOf(currentStatus);

    return statusFlow.map((status, index) => ({
      value: status,
      disabled: index < currentIndex, // Vô hiệu hóa các trạng thái trước đó
    }));
  };

  // Hiển thị thông báo khi người dùng nhấp vào trạng thái bị vô hiệu hóa
  const handleOptionClick = (isDisabled: boolean) => {
    if (isDisabled) {
      toast.error("Không thể cập nhật lại trạng thái trước đó!");
    }
  };

  const toggleExpandOrder = (orderId: number) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 bg-white shadow-lg z-10 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Quản lý đơn hàng</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3 transition duration-300 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Scrollable content for the table */}
      <div className="overflow-y-auto" style={{ maxHeight: "540px" }}>
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead className="bg-gray-300 sticky top-0">
            <tr className="text-center">
              {["STT", "Họ và tên", "Số điện thoại", "Địa chỉ", "Ngày tạo", "Tổng tiền", "Đơn hàng", "Trạng thái", "Tùy chỉnh"].map((heading) => (
                <th key={heading} className="py-2 px-3 border border-gray-300 font-semibold text-gray-600">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((item: Order) => (
              <React.Fragment key={item.id}>
                <tr className="hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out">
                  <td className="py-3 px-4 border-b text-center">{item.id}</td>
                  <td className="py-3 px-4 border-b text-center text-blue-500 font-serif">
                    {item.customer.name}
                  </td>
                  <td className="py-3 px-4 border-b text-center">{item.customer.phone_number}</td>
                  <td className="py-3 px-4 border-b text-center">{item.customer.address}</td>
                  <td className="py-3 px-4 border-b text-center">{item.created_at}</td>
                  <td className="py-3 px-4 border-b text-center text-red-500 font-bold">
                    {item.total_price.toLocaleString()} VNĐ
                  </td>
                  <td className="border-b text-center">
                    <button
                      className="text-white bg-yellow-500 w-20 h-8 rounded-md hover:bg-yellow-400 focus:outline-none transition duration-200 ease-in-out"
                      onClick={() => toggleExpandOrder(item.id)}
                    >
                      {expandedOrderId === item.id ? "Ẩn" : "Chi tiết"}
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b text-center text-red-500 font-medium">
                    {item.status}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <select
                      value={item.status}
                      onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 transition duration-300 focus:ring-2 focus:ring-yellow-500"
                    >
                      {getStatusOptions(item.status).map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          className={option.disabled ? "text-gray-400 cursor-not-allowed" : ""}
                          onClick={() => handleOptionClick(option.disabled)}
                        >
                          {option.value}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                {/* Hiển thị chi tiết sản phẩm khi hàng được mở rộng */}
                {expandedOrderId === item.id && (
                  <tr>
                    <td colSpan={9} className="py-4 px-4 border-b">
                      <h2 className="mb-2 font-medium">Chi tiết đơn hàng:</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.order_items.map((product) => (
                          <div key={product.id} className="flex items-center border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
                            <img
                              src={product.product_variant?.image || ""}
                              alt="Product"
                              className="w-24 h-24 object-cover mr-4 rounded-md"
                            />
                            <div className="flex-grow">
                              <div className="font-semibold text-lg">
                                <strong>Sản phẩm:</strong> {product.product_variant?.product?.name || "N/A"}
                              </div>
                              <div className="text-gray-700">
                                <strong>Số lượng:</strong> {product.quantity}
                              </div>
                              <div className="text-gray-700">
                                <strong>Giá:</strong> <span className="text-red-500 font-medium">{product.price.toLocaleString()}</span> VNĐ
                              </div>
                              <div className="text-gray-700">
                                <strong>Mã sản phẩm:</strong> {product.product_variant?.sku || "N/A"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminOrder;
