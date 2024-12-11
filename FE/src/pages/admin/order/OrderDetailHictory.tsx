/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Order, OrderItem } from "../../../interfaces/Order";
import { FcPrevious } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

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
  
    try {
      const updateData = {
        status: newStatus,
        ...(newStatus === "Đã giao hàng" && { status_payment: "Đã thanh toán" }),
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
  
  
  

  if (loading) {
    return (
      <div className="text-center mt-4">Đang tải chi tiết đơn hàng...</div>
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
                  <strong>Màu sắc:</strong> {item.product_variant?.color?.name || "Không có thông tin màu sắc"}
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
          {order.status !== "Hoàn thành" && (
            <div className="mt-4 flex items-center gap-2 ml-9">
              <h3 className="text-lg font-medium">Cập nhật trạng thái: </h3>
              <select
                value={order.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className={`
                  border px-4 py-2 rounded-md mt-2
                  ${
                    order.status === "Chờ xử lý" ||
                    order.status === "Đã xác nhận"
                      ? "border-yellow-500 text-yellow-500"
                      : order.status === "Đang vận chuyển"
                      ? "border-yellow-500 text-yellow-500"
                      : order.status === "Hoàn thành" ||
                        order.status === "Đã giao hàng"
                      ? "border-green-500 text-green-500"
                      : order.status === "Trả hàng"
                      ? "border-orange-500 text-orange-500"
                      : order.status === "Đã hủy"
                      ? "border-red-500 text-red-500"
                      : ""
                  }`}
              >
                <option value="Chờ xử lý">Chờ xử lý</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
                <option value="Trả hàng">Trả hàng</option>
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
              <p className="text-gray-600">Mã giảm giá:</p>
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
