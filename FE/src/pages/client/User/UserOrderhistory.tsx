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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const openModalComplanit = () => {
    setIsModalOpen(true);
  };
  const openModalRating = () => {
    setIsModalRatingOpen(true);
  };
  const handleCloseModalRating = () => {
    setIsModalRatingOpen(false); // Đóng modal
    setSelectedReason("");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedReason("");
    setSelectedOrderId(null); // Reset idOrder
  };

  const handleSelectReason = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReason(event.target.value);
  };

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/api/client/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        localStorage.setItem("orders", JSON.stringify(response.data)); // Lưu vào localStorage
      } catch (error) {
        setError("Lỗi khi tải trạng thái đơn hàng.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleCancelOrder = async (idOrder: number) => {
    const confirm = window.confirm("Bạn có muốn hủy đơn hàng này không?");
    if (confirm) {
      try {
        await axios.patch(
          `http://localhost:8000/api/client/orders/${idOrder}`,
          { status: "Đã hủy" },
          { headers: { Authorization: `Bearer ${token}` } }
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

  const handleFinishOrder = async (idOrder: number) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/client/orders/${idOrder}`,
        { status: "Hoàn thành" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === idOrder ? { ...order, status: "Hoàn thành" } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi hoàn thành đơn hàng:", error);
    }
  };

  const handleComplaintOrder = async () => {
    if (selectedOrderId === null || selectedReason === "") {
      console.error("Không có đơn hàng hoặc lý do khiếu nại chưa chọn");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8000/api/client/orders/${selectedOrderId}`,
        { status: "Trả hàng", note: selectedReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrderId ? { ...order, status: "Trả hàng" } : order
        )
      );
      handleCloseModal(); // Đóng modal sau khi khiếu nại
    } catch (error) {
      console.error("Lỗi khi gửi khiếu nại đơn hàng:", error);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl">
        {/* Tabs trạng thái */}
        <div className="flex justify-center gap-[5px] mb-8">
          {[
            "all",
            "Chờ xử lý",
            "Đã xác nhận",
            "Đang vận chuyển",
            "Đã giao hàng",
            "Hoàn thành",
            "Đã hủy",
            "Trả hàng",
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
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" role="status" />
              <span>Loading...</span>
            </button>
          </div>
        )}
        {/* Hiển thị lỗi khi không thể tải đơn hàng */}
        {error && <p className="text-center text-xl text-red-500">{error}</p>}

        {/* Hiển thị các đơn hàng đã lọc */}
        {filteredOrders.length === 0 && !loading ? (
          <p className="text-center text-xl text-gray-500">Không có đơn hàng.</p>
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
                  {/* Conditional Cancel Button */}
                  {["Chờ xử lý", "Đã xác nhận"].includes(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="mt-3 px-6 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
                    >
                      Hủy Đơn
                    </button>
                  )}
                  {/* Conditional Finish Button */}
                  {order.status === "Đang vận chuyển" && (
                    <button
                      onClick={() => handleFinishOrder(order.id)}
                      className="mt-3 px-6 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
                    >
                      Hoàn thành
                    </button>
                  )}
                  {/* Conditional Complaint Button */}
                  {order.status === "Đã giao hàng" && (
                    <button
                      onClick={() => openModalComplanit(order.id)}
                      className="mt-3 px-6 py-2 text-sm text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none"
                    >
                      Khiếu nại
                    </button>
                  )}
                </div>
              </div>

              {/* Complaint Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-semibold">Chọn lý do khiếu nại</h2>
                    <select
                      className="w-full mt-4 p-2 border rounded-md"
                      value={selectedReason}
                      onChange={handleSelectReason}
                    >
                      <option value="">Chọn lý do</option>
                      <option value="Sản phẩm không đúng mô tả">Sản phẩm không đúng mô tả</option>
                      <option value="Sản phẩm bị hỏng">Sản phẩm bị hỏng</option>
                      <option value="Chậm giao hàng">Chậm giao hàng</option>
                    </select>
                    <div className="mt-4 flex justify-between gap-3">
                      <button
                        onClick={handleComplaintOrder}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg"
                      >
                        Khiếu nại
                      </button>
                      {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">
                              Chọn lý do khiếu nại
                            </h2>
                            <select
                              value={selectedReason}
                              onChange={handleSelectReason}
                              className="w-full px-4 py-2 border rounded-lg mb-4"
                            >
                              <option value="">Chọn lý do</option>
                              <option value="Giao hàng không đúng yêu cầu">
                                Giao hàng không đúng yêu cầu
                              </option>
                              <option value="Sản phẩm có lỗi từ nhà cung cấp">
                                Sản phẩm có lỗi từ nhà cung cấp
                              </option>
                              <option value="Lý do khác">Lý do khác</option>
                            </select>

                            <div className="flex justify-end">
                              <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-red-500 border border-red-500 rounded-lg mr-2"
                              >
                                Đóng
                              </button>
                              <button
                                onClick={() => handleComplaintOrder(order.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                              >
                                Gửi khiếu nại
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
                    <div className="flex gap-[5px] items-center">
                      <p className="text-lg text-gray-700">Tên sản phẩm:</p>
                      <p className="text-lg text-gray-700 uppercase font-bold">
                        {item.product_variant?.product.name || "Không có"}
                      </p>
                    </div>
                    <p className="text-lg text-gray-700">
                      Số lượng: {item.quantity}
                    </p>
                    <p className="text-lg text-gray-700">
                      Giá đơn hàng:{" "}
                      <span className="font-bold text-gray-900">
                        {formatCurrency(order.total_price)} đ
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
                      Kích thước:{" "}
                      {item.product_variant?.size.name || "Không có"}
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

