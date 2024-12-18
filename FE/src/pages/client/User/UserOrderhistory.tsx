/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Order, OrderItem } from "../../../interfaces/Order";
import axios, { isCancel } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import {
  ArchiveX,
  CalendarArrowUp,
  CalendarX2,
  DatabaseBackup,
  PackageCheck,
} from "lucide-react";
import { FcInTransit } from "react-icons/fc";

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
  const [isComplaintActive, setComplaintActive] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStarClick = (star: any) => {
    setRating(star);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModalComplanit = (order: any) => {
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo ngày có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cộng thêm 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
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
  const handleComplaintOrder = async (idOrder: number, isCancel: boolean) => {
    try {
      if (isCancel) {
        await axios.put(
          `http://localhost:8000/api/client/orders/${idOrder}`,
          { note: "", status: "Đã giao hàng" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Hủy khiếu nại thành công");
        setOrders((prev) =>
          prev.map((order) =>
            order.id === idOrder
              ? { ...order, status: "Đã giao hàng", complaintSent: true }
              : order
          )
        );
      } else {
        await axios.put(
          `http://localhost:8000/api/client/return-order/${idOrder}`,
          { note: selectedReason, status: "Yêu cầu trả hàng" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Khiếu nại thành công");
        setOrders((prev) =>
          prev.map((order) =>
            order.id === idOrder
              ? { ...order, status: "Yêu cầu trả hàng", complaintSent: true }
              : order
          )
        );
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái khiếu nại:", error);
      setIsModalOpen(false);
    }
  };

  const handleSubmitRating = async (
    orderItemId: number,
    userId: number,
    product_variant_Id: number
    // orderId: number
  ) => {
    if (!comment.trim()) {
      alert("Hãy nhập đánh giá của bạn");
      return;
    } else if (rating === 0) {
      alert("Hãy nhập sao đánh giá");
      return;
    }
    const reviewData = {
      order__item_id: orderItemId,
      user_id: userId,
      product__variant_id: product_variant_Id,
      star: rating,
      content: comment,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/rate",
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleCloseModalRating();
      toast.success("Bạn đã đánh giá thành công");
    } catch (error) {
      toast.error(error.response.data.message);
      handleCloseModalRating();
    }
  };

  const statusMapping = {
    "Xử lý yêu cầu trả hàng": "Đang xử lý trả hàng", // Ánh xạ trạng thái
    all: "Tất cả",
    "Chờ xử lý": "Chờ xử lý",
    "Đã xác nhận": "Đã xác nhận",
    "Đang vận chuyển": "Đang vận chuyển",
    "Đã giao hàng": "Đã giao hàng",
    "Hoàn thành": "Hoàn thành",
    "Yêu cầu trả hàng": "Yêu cầu trả hàng",
    "Trả hàng": "Trả hàng",
    "Đã hủy": "Đã hủy",
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6 bg-white rounded-xl">
        {/* Tabs trạng thái */}
        <div className="grid grid-cols-5 mb-6">
          {[
            "all",
            "Chờ xử lý",
            "Đã xác nhận",
            "Đang vận chuyển",
            "Đã giao hàng",
            "Hoàn thành",
            "Yêu cầu trả hàng",
            "Xử lý yêu cầu trả hàng", // Giữ tên gốc trong mảng
            "Trả hàng",
            "Đã hủy",
          ].map((status) => (
            <div
              key={status}
              className={`relative p-1 transition-all duration-300 ease-in-out ${
                selectedStatus === status
                  ? "border-b-2 border-gray-400"
                  : "hover:border-b-2 hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => setSelectedStatus(status)}
                className={`w-full h-full px-4 py-2 text-center text-base font-medium transition-all duration-300 ease-in-out transform rounded-md ${
                  selectedStatus === status
                    ? "bg-gray-400 text-white scale-105"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-white"
                }`}
              >
                {status === "all"
                  ? statusMapping["all"]
                  : status === "Xử lý yêu cầu trả hàng"
                  ? statusMapping["Xử lý yêu cầu trả hàng"]
                  : status}
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
              <div className="flex pb-2 mb-2 items-center">
                <div className="flex w-1/2">
                  <div className="mr-9 flex flex-col">
                    <span className="text-blue-500">
                      {"# "} {order.order_code}
                    </span>
                    <div className="flex gap-2">
                      {order.status_payment === "Đã thanh toán" ? (
                        <span className="text-green-400">
                          {order.status_payment}
                        </span>
                      ) : (
                        <span className="text-orange-400">
                          {order.status_payment}
                        </span>
                      )}
                      {order.paymentMethod === "COD" ? (
                        <span className="text-orange-400">
                          {order.paymentMethod}
                        </span>
                      ) : (
                        <img
                          src="https://i.imgur.com/RAtc2Se.png"
                          alt="VNPAY"
                          className="w-8 h-8 ml-2"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mr-9 flex flex-col">
                    <span className="font-semibold">Ngày đặt</span>
                    <span> {formatDate(order.created_at)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">Tổng tiền</span>
                    <span className="text-red-500">
                      {formatCurrency(order.totalAfterDiscount)}đ
                    </span>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex justify-end gap-1 mt-4">
                    {["Chờ xử lý", "Đã xác nhận"].includes(order.status) && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                    {(order.status === "Đã giao hàng" ||
                      order.status === "Yêu cầu trả hàng") && (
                      <div className="flex gap-2">
                        {order.status === "Yêu cầu trả hàng" ? (
                          <button
                            onClick={() => {
                              setComplaintActive(false);
                              handleComplaintOrder(order.id, true);
                            }}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-gray-500 rounded-lg border  hover:bg-gray-600 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Hủy khiếu nại
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleFinishOrder(order.id)}
                              className="focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                            >
                              Hoàn thành
                            </button>
                            <button
                              onClick={() => {
                                setComplaintActive(true);
                                openModalComplanit(order);
                              }}
                              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-red-600 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Khiếu nại
                            </button>
                          </>
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
                                  onClick={() => {
                                    handleComplaintOrder(
                                      selectedItem.id,
                                      false
                                    ); // Gửi khiếu nại
                                    setComplaintActive(false);
                                  }}
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

                    {/* /profile/order-detail/${order.id} */}
                    <Link to={`/profile/order-detail/${order.id}`}>
                      <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Xem chi tiết đơn
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <hr className="w-full mb-3" />
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
                      <div className="flex flex-col w-[200px]">
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

                      <div className="ml-[470px] flex items-center gap-1">
                        <p className="text-lg font-medium text-red-600">
                          {formatCurrency(item.product_variant?.price || 0)} vnđ
                        </p>
                      </div>

                      {/* Nút đánh giá chỉ hiển thị khi order.status là "Hoàn thành" */}
                      {order.status === "Hoàn thành" && (
                        <button
                          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => openModalRating(item)}
                        >
                          Đánh giá
                        </button>
                      )}

                      {/* Modal đánh giá */}
                      {isModalRatingOpen &&
                        selectedItem &&
                        selectedItem.id === item.id && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                              <h2 className="text-xl font-semibold mb-4">
                                Gửi đánh giá
                              </h2>
                              <div className="flex gap-[10px]">
                                <img
                                  src={
                                    selectedItem.product_variant?.image ||
                                    "https://via.placeholder.com/150"
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
                                      selectedItem.product_variant.id
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
              </div>
              <hr />
              <div className="flex justify-between mt-4">
                {order.status === "Đang vận chuyển" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div className="bg-green-400 border rounded-full">
                      <FcInTransit className=" w-6 h-6" />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                {order.status === "Đã giao hàng" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div className="bg-yellow-200 border rounded-full">
                      <PackageCheck className=" w-6 h-6" />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                {order.status === "Hoàn thành" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div className="bg-green-400 border rounded-full">
                      <TiTick className="text-white w-6 h-6 " />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                {order.status === "Chờ xử lý" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div>
                      <CalendarArrowUp className="text-black w-6 h-6 " />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                {order.status === "Đã hủy" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div className="border-2 rounded-full border-red-500">
                      <CalendarX2 className="text-red-500 w-6 h-6 p-1" />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                {order.status === "Yêu cầu trả hàng" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div className="border-2 rounded-full border-black">
                      <DatabaseBackup className="text-black w-6 h-6 p-1" />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                {order.status === "Xử lý yêu cầu trả hàng" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div className="border-2 rounded-full border-red-500">
                      <DatabaseBackup className="text-black w-6 h-6 p-1" />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                {order.status === "Trả hàng" && (
                  <div className="w-1/2 flex items-center gap-2 ">
                    <div className="border-2 rounded-full border-black">
                      <ArchiveX className="text-black w-6 h-6 p-1" />
                    </div>
                    <h1>
                      {order.status} {formatDate(order.updated_at)}
                    </h1>
                  </div>
                )}
                <div className="flex justify-end">
                  {order.paymentMethod === "VNPAY" &&
                    order.status_payment === "Chưa thanh toán" &&
                    order.paymentURL && ( // Kiểm tra paymentURL có giá trị
                      <div className="flex justify-end">
                        <a
                          href={order.paymentURL} // Gắn link vào nút
                          target="_blank" // Mở liên kết trong tab mới
                          rel="noopener noreferrer" // Bảo mật liên kết
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 ease-in-out 
                                    hover:bg-blue-600 hover:scale-105 
                                    active:bg-blue-700 active:scale-95 
                                    focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          Thanh toán
                        </a>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer className={`mt-20`} />
    </div>
  );
};

export default UserOrderHistory;
