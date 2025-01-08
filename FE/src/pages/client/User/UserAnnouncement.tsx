import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { Order } from "../../../interfaces/Order";

const token = localStorage.getItem("access_token");

const UserAnnouncement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newestOrderId, setNewestOrderId] = useState<number | null>(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/client/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Sắp xếp các đơn hàng dựa trên cả `updated_at` và `created_at`
      const sortedOrders = data.sort((a: Order, b: Order) => {
        const dateA = Math.max(
          new Date(a.created_at).getTime(),
          new Date(a.updated_at).getTime()
        );
        const dateB = Math.max(
          new Date(b.created_at).getTime(),
          new Date(b.updated_at).getTime()
        );
        return dateB - dateA;
      });
  
      setOrders(sortedOrders);
      setNewestOrderId(
        sortedOrders.length > 0 ? Number(sortedOrders[0].id) : null
      );
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleViewDetail = (id: number) => {
    if (id === newestOrderId) {
      setNewestOrderId(null);
    }
  };

  return (
    <div className="p-5 font-sans">
      <div className="mb-4">
        <h2 className="font-bold text-3xl">Thông báo đơn hàng</h2>
        <div className="flex items-center gap-2 ml-2 text-gray-600">
          <IoHomeOutline />
          <GrFormNext />
          <h3 className="underline">Thông báo</h3>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Đang tải thông báo ...
          </span>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="ml-2 text-lg font-medium text-gray-600">
            Không có thông báo mới.
          </span>
        </div>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="relative flex justify-between items-start p-5 bg-white border-l-4 shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              style={{ borderColor: getStatusColor(order.status) }}
            >
              {newestOrderId === Number(order.id) && (
                <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                  MỚI
                </span>
              )}
              <div className="flex items-start">
                {/* Hiển thị ảnh sản phẩm */}
                <img
                  src={
                    order.order_items[0]?.productVariantImage
                      ? order.order_items[0].productVariantImage
                      : "https://via.placeholder.com/150"
                  }
                  alt={"Ảnh sản phẩm"}
                  className="w-28 h-28 object-cover rounded-lg border border-gray-200 mr-4"
                />

                <div className="flex flex-col">
                  {/* Tiêu đề thông báo */}
                  <h2 className="text-lg font-semibold text-gray-800">
                    {order.status === "Chờ xử lý"
                      ? "SnakerHub cảm ơn bạn đã đặt hàng"
                      : order.status === "Đã xác nhận"
                      ? "Đơn đặt hàng của bạn đã được xác nhận"
                      : order.status === "Đang vận chuyển"
                      ? "Đơn hàng của bạn đã được giao cho đơn vị vận chuyển"
                      : order.status === "Đã giao hàng"
                      ? `Đơn hàng ${order.order_items[0]?.nameProduct} của bạn đã được giao.`
                      : order.status === "Hoàn thành"
                      ? "Đơn hàng đã hoàn thành"
                      : order.status === "Yêu cầu trả hàng"
                      ? "Yêu cầu khiếu nại đơn hàng của bạn đã được gửi"
                      : `Đơn hàng ${order.order_code || "không xác định"}`}
                  </h2>

                  {/* Nội dung thông báo */}
                  <p className="text-sm text-gray-700 mt-2">
                    {order.status === "Đang vận chuyển"
                      ? `Đơn hàng của bạn đang được vận chuyển, mã đơn hàng là ${
                          order.order_code || "không xác định"
                        }`
                      : order.status === "Đã giao hàng"
                      ? order.status_payment === "Đã thanh toán"
                        ? `Đơn hàng của bạn đã được giao, vui lòng kiểm tra xác nhận và phản hồi lại với shop nha !`
                        : `Đơn hàng của bạn đã được giao, vui lòng thanh toán kiểm tra và hoàn tất đơn hàng`
                      : order.status === "Hoàn thành"
                      ? "Bạn có thể nêu trải nghiệm và đánh giá sản phẩm giúp shop nha !"
                      : `Mã đơn hàng của bạn là ${
                          order.order_code || "không xác định"
                        }`}
                  </p>

                  {/* Ghi chú đặt hàng */}
                  <p className="text-sm text-gray-700 mt-1">
                    {order.status === "Yêu cầu trả hàng" ? (
                      <>
                        <span className="font-semibold">
                          Nội dung khiếu nại:{" "}
                        </span>
                        {order.reason || "Không có khiếu nại"}
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">
                          Ghi chú đặt hàng:{" "}
                        </span>
                        {order.note || "Không có ghi chú"}
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {order.status === "Chờ xử lý"
                    ? new Intl.DateTimeFormat("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(order.created_at))
                    : new Intl.DateTimeFormat("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(order.updated_at))}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/profile/order-detail/${order.id}`}
                    onClick={() => handleViewDetail(order.id)}
                  >
                    <button className="px-4 py-2 text-gray-600 rounded-md hover:text-gray-700 hover:font-medium border-2 border-gray-500 transition-colors duration-200">
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function getStatusColor(status: Order["status"]) {
  switch (status) {
    case "Chờ xử lý":
      return "#3b82f6";
    case "Yêu cầu trả hàng":
      return "#f59e0b";
    case "Đã hủy":
      return "#ef4444";
    default:
      return "#6b7280";
  }
}

export default UserAnnouncement;
