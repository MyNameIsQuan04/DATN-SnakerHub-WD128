import React, { useState, useEffect } from "react";
import axios from "axios";
import { Order } from "../../../interfaces/Order";
import { FaSpinner } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { Complaint, Review, Notification } from "../../../interfaces/Notification";

const token = localStorage.getItem("access_token");
const API_REVIEW = "https://your-api-url.com/reviews"; // API đánh giá
const API_ORDER = "http://localhost:8000/api/orders"; // API đơn hàng
const API_COMPLAINT = "https://your-api-url.com/complaints"; // API khiếu nại

const ListNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Hàm gọi nhiều API
  const fetchNotifications = async () => {
    try {
      const [reviews, orders, complaints] = await Promise.all([
        axios.get(API_REVIEW, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(API_ORDER, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(API_COMPLAINT, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      // Hợp nhất dữ liệu và gắn nhãn loại thông báo
      const mergedData: Notification[] = [
        ...reviews.data.map((item: Review) => ({
          ...item,
          type: "Đánh giá",
        })),
        ...orders.data.map((item: Order) => ({
          ...item,
          type: "Đơn hàng",
        })),
        ...complaints.data.map((item: Complaint) => ({
          ...item,
          type: "Khiếu nại",
        })),
      ];

      // Sắp xếp thông báo theo thời gian giảm dần
      const sortedData = mergedData.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setNotifications((prev) => {
        // Lọc các thông báo trùng lặp
        const newNotifications = sortedData.filter(
          (notif) => !prev.some((oldNotif) => oldNotif.id === notif.id)
        );
        return [...newNotifications, ...prev];
      });

      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải thông báo:", error);
      setLoading(false);
    }
  };

  // Gọi API khi component render và định kỳ
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 font-sans">
      <div className="mb-4">
        <h2 className="font-bold text-3xl">Danh sách thông báo</h2>
        <div className="flex items-center gap-2 ml-2 text-gray-600">
          <div className="flex items-center gap-1">
            <IoHomeOutline />
            <GrFormNext />
          </div>
          <h3 className="underline">Thông báo</h3>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-[60vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Đang tải thông báo...
          </span>
        </div>
      )}

      {!loading && notifications.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="ml-2 text-lg font-medium text-gray-600">
            Không có thông báo mới.
          </span>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="flex items-center justify-between p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >
              <div>
                <p className="text-sm font-medium">
                  <span className="font-bold">Loại thông báo:</span>{" "}
                  {notification.type}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Người dùng:</span>{" "}
                  {notification.user || "Không rõ"}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Nội dung:</span>{" "}
                  {notification.content}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(notification.timestamp).toLocaleString("vi-VN")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListNotification;
