import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Order } from "../../../interfaces/Order";
import { GrPrevious } from "react-icons/gr";

const UserOrderhistorydetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [orderDetail, setOrderDetail] = useState<Order | null>(null); // Trạng thái chi tiết đơn hàng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

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

  // Hàm gọi API để lấy chi tiết đơn hàng
  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Order>(
        `http://localhost:8000/api/client/orders/${id}`
      );
      setOrderDetail(response.data);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // Gọi hàm fetchOrderDetail khi component được mount
  useEffect(() => {
    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatPhoneNumber = (value: any) => {
    value = value.replace(/\D/g, "");

    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6,
        10
      )}`;
    }
  };
  const totalPriceItem = (price: number, quantity: number) => price * quantity;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatCurrency = (value: any) => {
    return value.toLocaleString("vi-VN") + "₫";
  };
  // Xử lý trường hợp đang tải hoặc lỗi
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <div className="w-full h-16 border left-6 flex items-center pl-9 mb-3 justify-between">
        <Link
          to="/profile/order-history"
          className="flex gap-1 items-center font-bold text-xl ml-[-20px] hover:text-blue-500"
        >
          <GrPrevious /> Quay lại
        </Link>

        <div className="flex gap-5 items-center mr-5">
          <span>
            Mã #:{" "}
            <span className="text-blue-500">{orderDetail?.order_code}</span>
          </span>
          |
          <span
            className={`
              ${orderDetail?.status === "Chờ xử lý" ? "text-orange-500" : ""}
               ${orderDetail?.status === "Đã xác nhận" ? "text-orange-500" : ""}
                ${
                  orderDetail?.status === "Đang vận chuyển"
                    ? "text-yellow-500"
                    : ""
                }
                 ${
                   orderDetail?.status === "Đã giao hàng"
                     ? "text-yellow-500"
                     : ""
                 }
              ${orderDetail?.status === "Hoàn thành" ? "text-green-500" : ""}
              ${
                orderDetail?.status === "Đã hủy" ||
                orderDetail?.status === "Trả hàng"
                  ? "text-red-500"
                  : ""
              }
              shadow-sm
            `}
          >
            {orderDetail?.status}
          </span>
        </div>
      </div>
      {orderDetail ? (
        <div>
          <div className="container flex">
            <div className="w-1/2 p-4 border-r border-gray-300">
              <h2 className="font-bold text-xl">Địa chỉ nhận hàng</h2>
              <div className="ml-5 flex flex-col">
                <h3 className="mt-3 font-semibold">
                  {orderDetail.customer.name}
                </h3>
                <span>
                  SĐT: {formatPhoneNumber(orderDetail.customer.phone_number)}
                </span>
                <span>Địa chỉ: {orderDetail.customer.address}</span>
              </div>
            </div>

            <div className="w-1/2 p-4">
              {orderDetail.status === "Đã hủy" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ xử lí
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                        <span>{orderDetail.status}</span>
                        <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
              {orderDetail.status === "Đang vận chuyển" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ xử lí
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ Xác nhận
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                        <span>{orderDetail.status}</span>
                        <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
              {orderDetail.status === "Đã giao hàng" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ xử lí
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ Xác nhận
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Đang vận chuyển
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                        <span>{orderDetail.status}</span>
                        <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
              {orderDetail.status === "Hoàn thành" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ xử lí
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ Xác nhận
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Đang vận chuyển
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Đã giao hàng
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                        <span>{orderDetail.status}</span>
                        <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
              {orderDetail.status === "Trả hàng" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Đã giao hàng
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Yêu cầu trả hàng
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                        <span>{orderDetail.status}</span>
                        <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
              {orderDetail.status === "Chờ xử lý" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                        <span>{orderDetail.status}</span>
                        <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Chờ xác nhận
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Đang vận chuyển
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
              {orderDetail.status === "Đã xác nhận" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                        Chờ xử lí
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        <span>{orderDetail.status}</span>
                        <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Đang vận chuyển
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
              {orderDetail.status === "Xử lý yêu cầu trả hàng" && (
                <div>
                  <ul className="timeline timeline-vertical ml-[-330px]">
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Đã giao hàng
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box min-w-96">
                        Yêu cầu trả hàng
                      </div>
                      <hr />
                    </li>
                    <li>
                      <div className="timeline-middle bg-gray-200 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="timeline-end timeline-box flex flex-col min-w-96 bg-gray-200 p-2 border-2 border-gray-300 ">
                      <span>{orderDetail.status}</span>
                      <span>{formatDate(orderDetail.updated_at)}</span>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Thông tin đơn hàng  */}
          <div className="mt-3">
            <div className="space-y-6">
              {orderDetail.order_items.map((item) => (
                <div>
                  <div
                    key={item.id}
                    className="flex items-center border-t  rounded-md p-4 shadow-sm"
                  >
                    <img
                      src={
                        item.product_variant?.image ||
                        "https://via.placeholder.com/150"
                      }
                      className="w-20 h-20 rounded-md"
                    />
                    <div className="ml-4 flex-grow">
                      <p className="font-semibold">
                        {item.product_variant.name}
                      </p>
                      <p className="text-gray-600">
                        Màu: {item.product_variant.color.name}, Kích cỡ:{" "}
                        {item.product_variant.size.name}
                      </p>
                      <p className="w-16 ">X {item.quantity}</p>
                    </div>
                    <p className="w-24 text-center">
                      {formatCurrency(item.product_variant.price)}
                    </p>
                    <p className="w-24 text-center text-red-500">
                      {formatCurrency(
                        totalPriceItem(
                          item.product_variant.price,
                          item.quantity
                        )
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-start border-t-2 pt-4">
                {/* Phần thứ nhất: Khiếu nại, trạng thái đơn hàng, trạng thái thanh toán và phương thức thanh toán */}
                <div className="w-1/2 pr-6">
                  {orderDetail.status === "Trả hàng" || orderDetail.status === "Yêu cầu trả hàng" || orderDetail.status === "Xử lý yêu cầu trả hàng" ? (
                    <span className="block mb-2">
                      <strong>Khiếu nại: {""}</strong>
                      {orderDetail.note}
                    </span>
                  ) : (
                    <span className="block mb-2">
                      <strong>Ghi chú: </strong>Không có !
                    </span>
                  )}

                  <div className="flex gap-2 mb-2">
                    <h1 className="font-semibold">Trạng thái đơn hàng:</h1>
                    <h1 className="text-orange-400 font-semibold">
                      {orderDetail.status}
                    </h1>
                  </div>
                </div>

                {/* Phần thứ hai: Các thông tin tổng tiền */}
                <div className="w-1/2 pl-6">
                  <div className="flex gap-2 mt-4 mb-2">
                    <h1 className="font-medium">Thời gian tạo đơn:</h1>
                    <h1 className="text-gray-500">
                      {formatDate(orderDetail.created_at)}
                    </h1>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <h1 className="font-medium">Cập nhật gần đây:</h1>
                    <h1 className="text-gray-500">
                      {formatDate(orderDetail.updated_at)}
                    </h1>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <h1 className="font-medium">Trạng thái thanh toán:</h1>
                    {orderDetail.status_payment === "Đã thanh toán" ? (
                      <h1 className="text-green-400 font-semibold">
                        {orderDetail.status_payment}
                      </h1>
                    ) : (
                      <h1 className="text-orange-400 font-semibold">
                        {orderDetail.status_payment}
                      </h1>
                    )}
                  </div>

                  <div className="flex gap-2 mb-2 items-center mb-4">
                    <h1 className="font-medium">Phương thức thanh toán:</h1>
                    <h1 className="text-orange-400 font-semibold">
                      {orderDetail.paymentMethod}
                    </h1>
                    {/* Hiển thị logo VNPAY nếu phương thức thanh toán là VNPAY */}
                    {orderDetail.paymentMethod === "VNPAY" && (
                      <img
                        src="https://i.imgur.com/RAtc2Se.png"
                        alt="VNPAY"
                        className="w-8 h-8 ml-2"
                      />
                    )}
                  </div>
                  <p className="text-right flex justify-between mb-2 border-t-2 mt-3">
                    <span>Tổng tiền: </span>
                    <span className="font-medium text-lg text-red-600">
                      {formatCurrency(orderDetail.total_price)} vnđ
                    </span>
                  </p>

                  <p className="text-right flex justify-between mb-2">
                    <span>Phí vận chuyển: </span>
                    <span className="font-medium text-lg text-red-600">
                      {formatCurrency(orderDetail.shippingFee)} đ
                    </span>
                  </p>

                  <p className="text-right flex justify-between border-b-2 border-gray-200 mb-5">
                    <span>Mã giảm giá: </span>
                    <span className="font-medium text-lg text-red-600">
                      -{formatCurrency(orderDetail.discount)} đ
                    </span>
                  </p>

                  <p className="text-right flex justify-between">
                    <span className="font-semibold">Tổng tiền sau cùng: </span>
                    <span className="font-medium text-lg text-red-600">
                      {formatCurrency(orderDetail.totalAfterDiscount)} vnđ
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center h-full mt-5">
            <Link
              to="/profile/order-history"
              className="w-80 h-12 inline-block text-center px-6 py-3 bg-gray-400 text-white font-medium rounded-md shadow-md transition-all duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg active:bg-gray-800 active:scale-95"
            >
              Quay lại
            </Link>
          </div>
        </div>
      ) : (
        <div>Không tìm thấy thông tin đơn hàng.</div>
      )}
    </div>
  );
};

export default UserOrderhistorydetail;
