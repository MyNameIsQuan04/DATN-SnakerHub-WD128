import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { Notification } from "../../../interfaces/Notification";
import { Order } from "../../../interfaces/Order";
import { Link } from "react-router-dom";

const token = localStorage.getItem("access_token");

const ListNotification = () => {
  const [notifications, setNotifications] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newestNotificationId, setNewestNotificationId] = useState<
    number | null
  >(null);

  const fetchNotifications = async () => {
    try {
      const { data: orders } = await axios.get(
        `http://localhost:8000/api/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const mergedData: Notification[] = orders.map((item: Order) => ({
        ...item,
        type: "Đơn hàng",
      }));
  
      // Sắp xếp dựa trên thời gian mới nhất (created_at hoặc updated_at)
      mergedData.sort((a, b) => {
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
  
      setNotifications(mergedData);
      setNewestNotificationId(
        mergedData.length > 0 ? Number(mergedData[0].id) : null
      );
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải thông báo:", error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleViewDetail = (id: number) => {
    if (id === newestNotificationId) {
      setNewestNotificationId(null);
    }
  };

  return (
    <div className="p-5 font-sans">
      <div className="mb-4">
        <h2 className="font-bold text-3xl">Danh sách thông báo</h2>
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
            Đang tải thông báo...
          </span>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="ml-2 text-lg font-medium text-gray-600">
            Không có thông báo mới.
          </span>
        </div>
      ) : (
        <ul className="space-y-6">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="relative flex justify-between items-start p-5 bg-white border-l-4 shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              style={{ borderColor: getStatusColor(notification.status) }}
            >
              {newestNotificationId === Number(notification.id) && (
                <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                  MỚI
                </span>
              )}
              <div className="flex items-start">
                <img
                  src={
                    notification.order_items[0]?.productVariantImage
                      ? notification.order_items[0].productVariantImage
                      : "https://via.placeholder.com/150"
                  }
                  className="w-28 h-28 object-cover rounded-lg border border-gray-200 mr-4"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {notification.status === "Chờ xử lý"
                      ? `Đơn hàng mới được đặt từ người dùng`
                      : notification.status === "Yêu cầu trả hàng"
                      ? `Yêu cầu trả hàng`
                      : notification.status === "Đã hủy"
                      ? `Đơn hàng được hủy từ người dùng`
                      : "Đơn hàng được đặt từ người dùng"}
                  </h2>
                  <p className="text-sm text-gray-700 mt-2">
                    {notification.status === "Chờ xử lý"
                      ? `Đơn hàng ${
                          notification.order_code
                        } được đặt từ người dùng ${
                          notification.customer?.name || "không xác định"
                        }`
                      : notification.status === "Yêu cầu trả hàng"
                      ? `Yêu cầu trả hàng đơn hàng ${
                          notification.order_code
                        } từ người dùng ${
                          notification.customer?.name || "không xác định"
                        }`
                      : notification.status === "Đã hủy"
                      ? `Đơn hàng ${
                          notification.order_code
                        } được hủy từ người dùng ${
                          notification.customer?.name || "không xác định"
                        }`
                      : `Đơn hàng ${
                          notification.order_code
                        } được hủy từ người dùng ${
                          notification.customer?.name || "không xác định"
                        }`}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {notification.status === "Yêu cầu trả hàng" ? (
                      <span className="font-semibold">lý do: </span>
                    ) : (
                      <span className="font-semibold">Ghi chú: </span>
                    )}
                    {notification.status === "Yêu cầu trả hàng"
                      ? notification.reason || "Không có lý do trả hàng"
                      : notification.note || "Không có ghi chú"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {new Intl.DateTimeFormat("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(notification.created_at))}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/admin/order-detail/${notification.id}`}
                    onClick={() => handleViewDetail(notification.id)}
                  >
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
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

export default ListNotification;
