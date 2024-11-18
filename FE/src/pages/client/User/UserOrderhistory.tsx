import React, { useEffect, useState } from "react";
import { Order, OrderItem } from "../../../interfaces/Order";
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
  const [isModalRatingOpen, setIsModalRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  const handleStarClick = (star: any) => {
    setRating(star);
  };
  const handleCommentChange = (e: any) => {
    setComment(e.target.value); // Cập nhật nội dung bình luận
  };
  const openModalComplanit = () => {
    setIsModalOpen(true);
  };
  const openModalRating = (item: OrderItem) => {
    setSelectedItem(item);
    console.log(item);
    setIsModalRatingOpen(true);
  };
  const handleCloseModalRating = () => {
    setIsModalRatingOpen(false); // Đóng modal
    setRating(0);
    setComment("");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedReason("");
  };

  const handleSelectReason = (event: any) => {
    setSelectedReason(event.target.value);
    console.log(selectedReason);
  };
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
        localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Cập nhật localStorage
        localStorage.setItem("lastUpdate", `Đơn hàng ID ${idOrder} đã hủy`); // Thông báo cập nhật
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === idOrder ? { ...order, status: "Hoàn thành" } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi hoàn thành đơn hàng đơn hàng:", error);
    }
  };
  const handleComplaintOrder = async (idOrder: number) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/client/orders/${idOrder}`,
        { status: "Trả hàng", note: selectedReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsModalOpen(false);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === idOrder ? { ...order, status: "Trả hàng" } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi gửi khiếu nại đơn hàng đơn hàng:", error);
    }
  };

  const handleSubmitRating = async (
    orderItemId: number,
    userId: number,
    productId: number,
    orderId: number
  ) => {
    const reviewData = {
      order__item_id: orderItemId,
      user_id: userId,
      product_id: productId,
      star: rating,
      content: comment,
    };
    console.log(reviewData);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/client/orders/${orderId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleCloseModalRating();
      console.log("Đánh giá đã được gửi:", response.data);
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

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
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-3 text-lg font-semibold transition-all duration-300 transform rounded-[20px] border-2 ${
                selectedStatus === status
                  ? "bg-[#f2611c] text-white border-[#f2611c] scale-105"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-[#db6b37] hover:text-white"
              }`}
            >
              {status === "all" ? "Tất cả" : status}
            </button>
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
                      onClick={() => handleCancelOrder(order.id)}
                      className="ml-4 px-6 py-2 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                  {order.status === "Đã giao hàng" && (
                    <div className="">
                      <button
                        onClick={() => handleFinishOrder(order.id)}
                        className="ml-4 px-6 py-2 text-lg font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                      >
                        Hoàn thành
                      </button>
                      <button
                        onClick={openModalComplanit}
                        className="ml-4 px-6 py-2 text-lg font-semibold border border-red-500 text-red-500 rounded-lg transition-all duration-300"
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
                <p className="text-lg text-gray-700">
                  Giá đơn hàng:{" "}
                  <span className="font-bold text-gray-900">
                    {formatCurrency(order.total_price)} đ
                  </span>
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
                  <div className="flex">
                    <div className="flex flex-col ">
                      <div className="flex gap-[5px] items-center w-[500px]">
                        <p className="text-lg text-gray-700">Tên sản phẩm:</p>
                        <p className="text-lg text-gray-700 uppercase font-bold">
                          {item.product_variant?.product.name || "Không có"}
                        </p>
                      </div>
                      <p className="text-lg text-gray-700">
                        Số lượng: {item.quantity}
                      </p>

                      <p className="text-lg text-gray-700">
                        Giá sản phẩm:{" "}
                        <span className="font-bold text-gray-900">
                          {formatCurrency(item.product_variant?.price)} đ
                        </span>
                      </p>
                      <p className="text-lg text-gray-700">
                        Màu sắc:{" "}
                        {item.product_variant?.color.name || "Không có"}
                      </p>
                      <p className="text-lg text-gray-700">
                        Kích thước:{" "}
                        {item.product_variant?.size.name || "Không có"}
                      </p>
                    </div>
                    {order.status === "Hoàn thành" && (
                      <div className="mt-[60px]">
                        <button
                          className="ml-4 px-6 py-2 text-sm font-semibold border border-red-500 text-red-500 rounded-lg transition-all duration-300"
                          onClick={() => openModalRating(item)}
                        >
                          Đánh giá
                        </button>
                        {isModalRatingOpen && selectedItem && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                              <h2 className="text-xl font-semibold mb-4">
                                Gửi đánh giá
                              </h2>
                              <div className="flex gap-[10px]">
                                <img
                                  src={
                                    selectedItem.product_variant?.image ||
                                    "https://via.placeholder.com/150" // Hình ảnh mặc định nếu không có
                                  }
                                  alt="Product"
                                  className="w-[90px] h-[90px] object-cover rounded-lg shadow-md"
                                />
                                <div className="flex flex-col ">
                                  <div className="flex gap-[5px] items-center w-[500px]">
                                    <p className="text-lg text-gray-700">
                                      Tên sản phẩm:
                                    </p>
                                    <p className="text-lg text-gray-700 uppercase font-bold">
                                      {selectedItem.product_variant?.product
                                        .name || "Không có"}
                                    </p>
                                  </div>
                                  <p className="text-lg text-gray-700">
                                    Màu sắc:{" "}
                                    {selectedItem.product_variant?.color.name ||
                                      "Không có"}
                                  </p>
                                  <p className="text-lg text-gray-700">
                                    Kích thước:{" "}
                                    {selectedItem.product_variant?.size.name ||
                                      "Không có"}
                                  </p>
                                </div>
                              </div>
                              <div className="">
                                <div className="flex gap-1 mt-[10px]">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                      key={star}
                                      onClick={() => handleStarClick(star)}
                                      className={`w-6 h-6 cursor-pointer rounded-sm ${
                                        star <= rating
                                          ? "text-yellow-500"
                                          : "text-gray-400"
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.845L19.335 24 12 20.401 4.665 24 6 15.595 0 9.75l8.332-1.595L12 .587z" />
                                    </svg>
                                  ))}
                                </div>
                                <textarea
                                  value={comment}
                                  onChange={handleCommentChange}
                                  className="border h-[200px] border-gray-400 w-full mt-[10px] rounded-lg pl-[10px] p-[5px]"
                                ></textarea>
                              </div>
                              <div className="flex justify-end mt-[10px]">
                                <button
                                  onClick={handleCloseModalRating}
                                  className="px-4 py-2 text-red-500 border border-red-500 rounded-lg mr-2"
                                >
                                  Đóng
                                </button>
                                <button
                                  onClick={() =>
                                    handleSubmitRating(
                                      item.id,
                                      order.customer.user_id,
                                      item.product_variant.product.id as number,
                                      order.id
                                    )
                                  }
                                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                  Gửi đánh giá
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
