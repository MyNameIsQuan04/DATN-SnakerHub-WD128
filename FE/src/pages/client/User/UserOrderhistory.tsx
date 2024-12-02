import React, { useEffect, useState } from "react";
import { Order, OrderItem } from "../../../interfaces/Order";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const formatCurrency = (amount: number) => {
  if (amount === undefined || amount === null) {
    return "0"; 
  }
  return amount.toLocaleString("vi-VN"); 
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStarClick = (star: any) => {
    setRating(star);
    console.log(star);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCommentChange = (e: any) => {
    setComment(e.target.value); 
  };
  const openModalComplanit = (order) => {
    setIsModalOpen(true);
    setSelectedItem(order);
    console.log(order);
  };
  const openModalRating = (item: OrderItem) => {
    setSelectedItem(item);
    console.log(item);
    setIsModalRatingOpen(true);
  };
  const handleCloseModalRating = () => {
    setIsModalRatingOpen(false); 
    setRating(0);
    setComment("");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedReason("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectReason = (event: any) => {
    setSelectedReason(event.target.value);
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
        console.log(response.data);
        localStorage.setItem("orders", JSON.stringify(response.data)); 
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
    console.log(idOrder);
    try {
      await axios.put(
        `http://localhost:8000/api/client/return-order/${idOrder}`,
        { note: selectedReason, status: "Yêu cầu trả hàng" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(selectedReason);
      toast.success("Khiếu nại thành công");
      setOrders((prev) =>
        prev.map((order) => (order.id === idOrder ? { ...order, complaintSent: true } : order))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi gửi khiếu nại đơn hàng đơn hàng:", error);
      setIsModalOpen(false);
    }
  };
  const handleSubmitRating = async (
    orderItemId: number,
    userId: number,
    product_variant_Id: number,
    orderId: number 
  ) => {
    const reviewData = {
      order__item_id: orderItemId,
      user_id: userId,
      product__variant_id: product_variant_Id,
      star: rating,
      content: comment,
    };
  
    console.log("Dữ liệu đánh giá:", reviewData);
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/rate", // Endpoint mới
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      console.log("Đánh giá đã được gửi thành công:", response.data);
      handleCloseModalRating(); 
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };
  

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6 bg-white rounded-xl">
        {/* Tabs trạng thái */}
        <div className="flex justify-center mb-6">
          {[
            "all",
            "Chờ xử lý",
            "Đã xác nhận",
            "Đang vận chuyển",
            "Đã giao hàng",
            "Hoàn thành",
            "Trả hàng",
            "Đã hủy",
          ].map((status) => (
            <div
              key={status}
              className={`relative px-2 py-3 transition-all duration-300 ease-in-out ${
                selectedStatus === status
                  ? "border-b-2 border-gray-600 mt-6"
                  : "hover:border-b-2 hover:border-gray-400 mt-6"
              }`}
            >
              <button
                onClick={() => setSelectedStatus(status)}
                className={`w-full px-6 py-4 text-base font-medium transition-all duration-300 ease-in-out transform rounded-md ${
                  selectedStatus === status
                    ? "bg-gray-600 text-white scale-105"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-500 hover:text-white"
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
          filteredOrders.map((order: Order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="pb-2">
                <span className="font-semibold">Mã đơn hàng:</span>
                <span>
                  {"# "} {order.order_code}
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  {order.order_items.map((item: OrderItem) => (
                    <div key={item.id} className="flex items-center gap-4 mb-4">
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
                        <div className="flex items-center gap-1">
                          <span>Loại hàng: </span>
                          <p className="text-lg text-gray-700">
                            {item.product_variant?.color.name || "Không có"}
                          </p>
                          <p className="text-lg text-gray-700">
                            {", "}
                            {item.product_variant?.size.name || "Không có"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Số lượng: </span>
                          <p className="text-lg text-gray-700">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                      {/* Đẩy đơn giá sát lề phải */}
                      <div className="ml-[410px] flex items-center gap-1">
                        <span>Đơn giá: </span>
                        <p className="text-lg font-medium text-red-600">
                          {formatCurrency(item.product_variant?.price || 0)} vnđ
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div className="text-right">
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
              </div>
              <div className="">
                <p
                  className="
                 text-right"
                >
                  <span>Tổng tiền: </span>
                  <span className="font-medium text-lg text-red-600">
                    {formatCurrency(order.total_price)} vnđ
                  </span>
                </p>
                <div className="flex justify-end gap-1 mt-4">
                  {["Chờ xử lý", "Đã xác nhận"].includes(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                  {order.status === "Đã giao hàng" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFinishOrder(order.id)}
                        className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                      >
                        Hoàn thành
                      </button>
                      {!order.omplaintSent && (
                        <button
                        onClick={() => openModalComplanit(order)}
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-red-600 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Khiếu nại
                      </button>
                      )}
                      {isModalOpen && selectedItem && (
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
                                onClick={() =>
                                  handleComplaintOrder(selectedItem.id)
                                }
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
                  {order.status === "Hoàn thành" && (
                    <div>
                      {order.order_items.map((item) => (
                        <div key={item.id}>
                          <button
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-red-500 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => {
                              openModalRating(item);
                            }}
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
                                  <div className="flex flex-col">
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
                                      {selectedItem.product_variant?.color
                                        .name || "Không có"}
                                    </p>
                                    <p className="text-lg text-gray-700">
                                      Kích thước:{" "}
                                      {selectedItem.product_variant?.size
                                        .name || "Không có"}
                                    </p>
                                  </div>
                                </div>
                                <div>
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
                                        selectedItem.id,
                                        order.customer.user_id,
                                        selectedItem.product_variant.id,
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
                      ))}
                    </div>
                  )}
                  {/* /profile/order-detail/${order.id} */}
                  <Link to={`/profile/order-detail/${order.id}`}>
                    <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      Xem chi tiết đơn
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer className={`mt-20`}/>
    </div>
  );
};

export default UserOrderHistory;
