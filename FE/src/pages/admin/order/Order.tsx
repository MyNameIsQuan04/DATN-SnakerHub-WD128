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

  const toggleExpandOrder = (orderId: number) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 bg-white shadow-lg z-10 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Quản lý đơn hàng
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3"
          />
        </div>
      </div>

      {/* Scrollable content for the table */}
      <div className="overflow-y-auto" style={{ maxHeight: "540px" }}>
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead className="bg-green-400 sticky top-0 ">
            <tr className="text-center">
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                STT
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Họ và tên
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Số điện thoại
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Địa chỉ
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Ngày tạo
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Tổng tiền
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Chi tiết đơn hàng
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Trạng thái
              </th>
              <th className="py-2 px-3 border border-gray-300 font-semibold text-white">
                Tùy chỉnh
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item: Order) => (
              <React.Fragment key={item.id}>
                <tr className="hover:bg-gray-50 cursor-pointer transition duration-200">
                  <td className="py-3 px-4 border-b text-center">{item.id}</td>
                  <td className="py-3 px-4 border-b text-center text-blue-500 font-serif">
                    {item.customer.name}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {item.customer.phone_number}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {item.customer.address}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {item.created_at}
                  </td>
                  <td className="py-3 px-4 border-b text-center text-red-500 font-bold">
                    {item.total_price.toLocaleString()} VNĐ
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      className="text-blue-600 hover:text-blue-800 focus:outline-none"
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
                      onChange={(e) =>
                        handleUpdateStatus(item.id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="chờ xử lý">Chờ xử lý</option>
                      <option value="đã xác nhận">Đã xác nhận</option>
                      <option value="đang vận chuyển">Đang vận chuyển</option>
                      <option value="hoàn thành">Đã giao hàng</option>
                      <option value="đã hủy">Đã hủy</option>
                    </select>
                  </td>
                </tr>

                {/* Hiển thị chi tiết sản phẩm khi hàng được mở rộng */}
                {expandedOrderId === item.id && (
                  <tr>
                    <td colSpan={9} className="py-4 px-4 border-b">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.order_items.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center border p-4 rounded-lg shadow-md bg-white"
                          >
                            <img
                              src={product.product_variant?.image || ""}
                              alt="Product"
                              className="w-20 h-20 object-cover mr-4 rounded-md"
                            />
                            <div className="flex-grow">
                              <div className="font-semibold text-lg">
                                <strong>Sản phẩm:</strong>{" "}
                                {product.product_variant?.product?.name ||
                                  "N/A"}
                              </div>
                              <div className="text-gray-700">
                                <strong>Số lượng:</strong> {product.quantity}
                              </div>
                              <div className="text-gray-700">
                                <strong>Giá:</strong>{" "}
                                <span className="text-red-500 font-medium">
                                  {product.price.toLocaleString()}
                                </span>{" "}
                                VNĐ
                              </div>
                              <div className="text-gray-700">
                                <strong>Mã sản phẩm :</strong>{" "}
                                {product.product_variant?.sku || "N/A"}
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
