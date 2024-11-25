import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Order } from "../../../interfaces/Order";

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  // Tải danh sách đơn hàng khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Lọc đơn hàng khi có thay đổi về từ khóa tìm kiếm, trạng thái hoặc danh sách đơn hàng
  useEffect(() => {
    filterOrders();
  }, [searchTerm, filterStatus, orders]);

  // Lấy danh sách đơn hàng từ API
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/orders");
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Lọc đơn hàng theo từ khóa tìm kiếm và trạng thái
  const filterOrders = () => {
    let filtered = orders;

    // Lọc theo trạng thái
    if (filterStatus) {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.order_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.phone_number.includes(searchTerm)
      );
    }

    setFilteredOrders(filtered);
  };

  // Cập nhật trạng thái đơn hàng
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

  // Chuyển đổi giữa việc hiển thị chi tiết đơn hàng
  const toggleExpandOrder = (orderId: number) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  // Danh sách trạng thái có sẵn để lọc
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
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Quản lý đơn hàng</h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3 transition duration-300 focus:ring-2 focus:ring-yellow-500"
          />
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

      {filteredOrders.length === 0 && searchTerm && (
        <div className="mt-4 text-center text-red-500 font-semibold">
          Không tìm thấy đơn hàng với từ khóa tìm kiếm "{searchTerm}"
        </div>
      )}

      {filteredOrders.length > 0 && (
        <div className="overflow-y-auto mt-4" style={{ maxHeight: "540px" }}>
          <table className="min-w-full bg-white border border-gray-100 shadow-md">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-center">
                {[
                  "Mã đơn hàng",
                  "Họ và tên",
                  "Thông tin",
                  "Ngày tạo",
                  "Tổng tiền",
                  "Đơn hàng",
                  "Tùy chỉnh",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-2 px-3 border border-gray-300 font-semibold text-gray-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((item: Order) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out">
                    <td className="py-3 px-4 border-b text-center">
                      <span className="mr-1">#</span>
                      <span>{item.order_code}</span>
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {item.customer.name}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <span>{item.customer.phone_number}</span> ,{" "}
                      {item.customer.address}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {item.created_at}
                    </td>
                    <td className="py-3 px-4 border-b text-center text-red-500 font-bold">
                      {item.total_price.toLocaleString()} VNĐ
                    </td>
                    <td className="border-b text-center">
                      <button
                        className="text-gray-500 bg-white w-20 h-8 rounded-md border-2 border-gray-500 transition duration-200 ease-in-out 
                        hover:bg-gray-200 hover:border-gray-400 focus:outline-none"
                        onClick={() => toggleExpandOrder(item.id)}
                      >
                        {expandedOrderId === item.id ? "Ẩn" : "Chi tiết"}
                      </button>
                    </td>

                    <td className="py-3 px-4 border-b text-center">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleUpdateStatus(item.id, e.target.value)
                        }
                        className={`border rounded px-2 py-1 transition duration-300 
                          ${
                            item.status === "Chờ xử lý" ||
                            item.status === "Đã xác nhận"
                              ? "border-red-500 text-red-500 focus:ring-2 focus:ring-red-500"
                              : item.status === "Đang vận chuyển"
                              ? "border-orange-500 text-orange-500 focus:ring-2 focus:ring-orange-500"
                              : item.status === "Đã giao hàng" ||
                                item.status === "Hoàn thành"
                              ? "border-green-500 text-green-500 focus:ring-2 focus:ring-green-500"
                              : "border-gray-300 text-gray-700 focus:ring-2 focus:ring-yellow-500"
                          }`}
                      >
                        {getStatusButtons()
                          .filter((status) => status.label !== "Tất cả")
                          .map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                      </select>
                    </td>
                  </tr>

                  {expandedOrderId === item.id && (
                    <tr>
                      <td colSpan={9} className="py-4 px-4 border-b">
                        <h2 className="mb-2 font-medium">Chi tiết đơn hàng:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.order_items.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
                            >
                              <img
                                src={product.product_variant?.image || ""}
                                alt="Product"
                                className="w-24 h-24 object-cover mr-4 rounded-md"
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
                                  <strong>Mã sản phẩm:</strong>{" "}
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
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminOrder;
