/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Order, OrderItem } from "../../../interfaces/Order";
import { FcPrevious } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

const OrderDetailHictory = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("access_token");

  const formatDate = (dateString: string) => {
    const optionsDate: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("vi-VN", optionsDate); // Chỉ ngày
    const formattedTime = date.toLocaleTimeString("vi-VN", optionsTime); // Chỉ giờ

    return `${formattedDate} ${formattedTime}`;
  };

  const fetchOrderDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(data);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Không thể tải chi tiết đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (order?.status === newStatus) {
      toast.info("Trạng thái này đã được cập nhật.");
      return;
    }

    // Kiểm tra nếu trạng thái hiện tại là "Đã giao hàng" và thời gian đã trôi qua ít hơn 5 ngày
    if (order?.status === "Đã giao hàng" && newStatus === "Hoàn thành") {
      const timeElapsed =
        new Date().getTime() - new Date(order.updated_at).getTime();
      // 1 ngày tính bằng giây
      const fiveDaysInMilliseconds = 1 * 24 * 60 * 60 * 1000;

      if (timeElapsed < fiveDaysInMilliseconds) {
        toast.warn(
          "Chỉ có thể cập nhật thành 'Hoàn thành' sau 3 ngày kể từ khi đã giao đơn hàng."
        );
        return;
      }
    }

    try {
      const updateData = {
        status: newStatus,
        ...(newStatus === "Đã giao hàng" && {
          status_payment: "Đã thanh toán",
        }),
      };

      const { status } = await axios.put(
        `http://localhost:8000/api/orders/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (status === 200) {
        setOrder((prev) => (prev ? { ...prev, ...updateData } : null));
        toast.success("Cập nhật trạng thái thành công!");
      }
    } catch {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  const handleDeleteRequest = async (orderId: number) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/orders/${orderId}`,
        {
          status: "Đã giao hàng",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrder((prevOrder) =>
        prevOrder ? { ...prevOrder, status: "Đã giao hàng" } : null
      );
      toast.success("Hủy yêu cầu thành công!");
      fetchOrderDetail();
    } catch (error) {
      console.error("Lỗi khi xác nhận hủy yêu cầu:", error);
      toast.error("Xác nhận hủy yêu cầu thất bại. Vui lòng thử lại.");
    }
  };
  const handleConfirmRequest = async (orderId: number) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/orders/${orderId}`,
        {
          status: "Xử lý yêu cầu trả hàng",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrder((prevOrder) =>
        prevOrder ? { ...prevOrder, status: "Xử lý yêu cầu trả hàng" } : null
      );
      toast.success("Xác nhận trả hàng thành công");
      fetchOrderDetail();
    } catch (error) {
      console.error("Lỗi khi xác nhận trả hàng:", error);
      toast.error("Xác nhận trả hàng thất bại. Vui lòng thử lại.");
    }
  };

  const UpdateRequest = async (orderId: number, newStatus: string) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/orders/${orderId}`,
        {
          status: newStatus, // Truyền trạng thái mới từ tham số vào
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Cập nhật trạng thái mới cho order
      setOrder((prevOrder) =>
        prevOrder && prevOrder.id === orderId
          ? { ...prevOrder, status: newStatus }
          : prevOrder
      );
      toast.success("Cập nhật trạng thái đơn hàng thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Cập nhật trạng thái thất bại. Vui lòng thử lại.");
    }
  };
  const statusOrder = [
    "Chờ xử lý",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Đã giao hàng",
    "Hoàn thành",
    "Trả hàng",
    "Đã hủy",
  ];

  // Hàm tính chỉ số trạng thái
  const getStatusIndex = (currentStatus: string): number => {
    return statusOrder.indexOf(currentStatus);
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <span className="ml-2 text-lg font-medium text-gray-600">
          Đang tải chi tiết đơn hàng ....
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!order) {
    return (
      <div className="text-center text-red-500 mt-4">
        Không tìm thấy đơn hàng.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white ">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">Đơn hàng:</h1>
        <span className="text-yellow-500 text-2xl font-bold">
          #{order.order_code}
        </span>
      </div>

      <div className="mb-4">
        <Link
          to="/admin/order"
          className="flex items-center text-blue-500 hover:underline"
        >
          <FcPrevious /> Quay lại danh sách đơn hàng
        </Link>
      </div>

      <div className="p-4">
        {order.order_items.map((item: OrderItem) => (
          <div
            key={item.id}
            className="flex flex-wrap md:flex-nowrap border-b py-4 items-center"
          >
            <div className="w-full md:w-1/4 flex justify-center h-60">
              <img
                src={item.product_variant?.image || ""}
                alt={item.product_variant?.product?.name || "Sản phẩm"}
                className="object-contain h-full w-full rounded-md"
              />
            </div>
            <div className="w-full md:w-3/4 md:pl-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-500">
                {item.product_variant?.product?.name || "Tên sản phẩm không có"}
              </h2>
              <p className="text-gray-700 italic">
                <strong>Mô tả:</strong>{" "}
                {item.product_variant?.product?.description ||
                  "Không có mô tả."}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p>
                  <strong>Số lượng:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Màu sắc:</strong>{" "}
                  {item.product_variant?.color?.name ||
                    "Không có thông tin màu sắc"}
                </p>
                <p>
                  <strong>Kích cỡ:</strong>{" "}
                  {item.product_variant?.size?.name ||
                    "Không có thông tin kích cỡ"}
                </p>
                <p>
                  <strong>Đơn giá:</strong>{" "}
                  <span className="text-red-500 font-bold">
                    {item.price.toLocaleString()} VNĐ
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-2/3 p-4 mt-2 border-b-2">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            Thông tin khách hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Họ và tên:</strong> {order.customer.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.customer.phone_number}
            </p>
            <p>
              <strong>Địa chỉ: </strong> {order.customer.address}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {order.customer.user.email || "Không có email"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-2/3 p-4 mt-2 border-b-2">
          <h2 className="text-xl font-semibold mb-6 text-blue-500 ">
            Thông tin đơn hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Trạng thái: </strong>
              <span
                className={`${
                  order.status === "Hoàn thành"
                    ? "text-gray-500"
                    : "text-yellow-500"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              <strong>Thời gian tạo đơn: </strong>{" "}
              <span className="text-red-500 ">
                {formatDate(order.created_at)}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <strong>Phương thức thanh toán:</strong>{" "}
              {order.paymentMethod === "COD" ? (
                <span className="text-yellow-500 font-bold">
                  COD (thanh toán sau)
                </span>
              ) : order.paymentMethod === "VNPAY" ? (
                <span className="flex items-center gap-2">
                  <span className="text-blue-500 font-bold">VNPAY</span>
                  <img
                    src="https://i.imgur.com/RAtc2Se.png"
                    alt="VNPay"
                    className="w-6 h-6"
                  />
                </span>
              ) : null}
            </p>
            <p>
              <strong>Cập nhật đơn lần cuối: </strong>{" "}
              <span className="text-red-500 ">
                {formatDate(order.updated_at)}
              </span>
            </p>
            <p>
              <strong>Trạng thái thanh toán: </strong>{" "}
              <span className="text-red-500 ">{order.status_payment}</span>
            </p>
          </div>
          {order.status === "Yêu cầu trả hàng" && (
            <div className="py-6 px-6 border-b bg-gray-50 w- ">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-gray-800 mb-2">
                    Yêu cầu trả hàng:
                  </h1>
                  <h2 className="text-sm text-gray-600">- {order.note}</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-md border text-sm bg-white text-gray-500 border-gray-500 hover:bg-gray-300 transition duration-200"
                    onClick={() => handleDeleteRequest(order.id)}
                  >
                    Hủy yêu cầu
                  </button>
                  <button
                    className="px-4 py-2 rounded-md border text-sm bg-gray-500 text-white border-gray-500 hover:bg-gray-600 transition duration-200"
                    onClick={() => handleConfirmRequest(order.id)}
                  >
                    Xác nhận yêu cầu
                  </button>
                </div>
              </div>
            </div>
          )}

          {order.status === "Xử lý yêu cầu trả hàng" && (
            <div className="py-6 px-6 border-b bg-white">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-lg font-medium text-gray-800 mb-2">
                    Cập nhật trạng thái:
                  </h1>
                </div>
                <div>
                  <select
                    className="px-4 py-2 rounded-md border text-sm bg-white text-yellow-500 border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 shadow-md transition duration-200"
                    onChange={(e) => UpdateRequest(order.id, e.target.value)}
                    value={order.status}
                  >
                    <option value="Xử lý yêu cầu trả hàng">
                      Xử lý yêu cầu trả hàng
                    </option>
                    <option value="Trả hàng">Trả hàng</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {order.status !== "Hoàn thành" &&
            order.status !== "Yêu cầu trả hàng" &&
            order.status !== "Xử lý yêu cầu trả hàng" && (
              <div className="mt-4 flex items-center gap-4">
                <h3 className="text-lg font-medium">Cập nhật trạng thái:</h3>
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  className="border px-4 py-2 rounded-md transition duration-300 text-gray-600 border-gray-500"
                >
                  {[
                    { value: "Chờ xử lý", label: "Chờ xử lý" },
                    { value: "Đã xác nhận", label: "Đã xác nhận" },
                    { value: "Đang vận chuyển", label: "Đang vận chuyển" },
                    { value: "Đã giao hàng", label: "Đã giao hàng" },
                    { value: "Hoàn thành", label: "Hoàn thành" },
                    { value: "Đã hủy", label: "Đã hủy" },
                    { value: "Trả hàng", label: "Trả hàng" },
                  ].map((statusOption, index) => (
                    <option
                      key={index}
                      value={statusOption.value}
                      disabled={index < getStatusIndex(order.status)}
                      className={
                        index < getStatusIndex(order.status)
                          ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                          : "text-gray-600"
                      }
                    >
                      {statusOption.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4  p-4">
        <div className="w-full md:w-1/3"></div>
        <div className="w-full md:w-2/3">
          <h2 className="text-lg md:text-xl font-semibold text-blue-500 mb-4 pb-2">
            Thành tiền
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-gray-600">Tổng tiền:</p>
              <p className="text-gray-800 font-semibold">
                {order.total_price.toLocaleString()} VNĐ
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Phí vận chuyển:</p>
              <p className="text-red-600 font-semibold">
                {order.shippingFee.toLocaleString()} VNĐ
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-1">
                <p className="text-gray-600">Mã giảm giá:</p>
                <p className="text-blue-600">{order.codeDiscount}</p>
              </div>
              <p className="text-yellow-600 font-semibold">
                - {order.discount.toLocaleString()} VNĐ
              </p>
            </div>
            <div className="flex justify-between border-t pt-2">
              <p className="text-gray-800 font-semibold">Tổng tiền sau giảm:</p>
              <p className="text-red-500 font-bold">
                {order.totalAfterDiscount.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center h-full mt-5">
        <Link
          to="/admin/order"
          className="w-80 h-12 inline-block text-center px-6 py-3 bg-gray-400 text-white font-medium rounded-md shadow-md transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg active:bg-gray-800 active:scale-95"
        >
          Quay lại danh sách
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OrderDetailHictory;
