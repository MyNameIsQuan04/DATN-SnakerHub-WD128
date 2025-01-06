import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineAnnouncement, MdOutlineManageAccounts } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

type Announcement = {
  id: number;
  title: string;
  content: string;
  read: boolean;
  created_at: string;
  updated_at: string;
};

const token = localStorage.getItem("access_token");

const UserProfile = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Announcement[]>([]);
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [latestNotification, setLatestNotification] = useState<Announcement | null>(
    null
  );
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(true);
  const { user } = useAuth();

  const fetchAnnouncements = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const unreadNotifications = data.filter(
        (announcement: Announcement) => !announcement.read
      );

      const sortUnreadNotifications = (a: Announcement, b: Announcement): number => {
        const dateA = Math.max(
          new Date(a.created_at).getTime(),
          new Date(a.updated_at).getTime()
        );
        const dateB = Math.max(
          new Date(b.created_at).getTime(),
          new Date(b.updated_at).getTime()
        );
        return dateB - dateA;
      };

      unreadNotifications.sort(sortUnreadNotifications);

      setNotifications(unreadNotifications);
      setNotificationsCount(unreadNotifications.length);
      setLatestNotification(unreadNotifications[0] || null);

      // Kiểm tra xem có thông báo mới chưa đọc
      if (unreadNotifications.length > 0 && !hasNewNotification) {
        setHasNewNotification(true);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAnnouncements();
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAnnouncements();
    }
  }, [user]);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);

    // Khi nhấn vào mục "Thông báo", ẩn số thông báo mới
    if (buttonName === "notification") {
      setHasNewNotification(false);
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-12 lg:p-24 min-h-screen flex flex-col md:flex-row gap-10 mt-5">
      {/* Sidebar */}
      <aside className="sidebar h-[600px] w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-xl p-6">
        <div className="profile flex items-center gap-3 mb-8">
          <img
            className="rounded-full w-20 h-20  object-cover shadow-lg border-4 border-white hover:border-blue-500"
            src={user?.avatar ? user.avatar : "https://via.placeholder.com/100"}
            alt="User Profile Picture"
          />
          <div>
            <span className="text-xl font-bold text-gray-500 underline">
              Hi,{" "}
            </span>
            <span className="text-xl font-bold text-blue-500 font-serif">
              {user?.name}
            </span>
            <a
              href="/profile/userinfo"
              className="text-sm text-primary underline block mt-2"
            >
              Sửa Hồ Sơ
            </a>
          </div>
        </div>
        <nav className="menu space-y-4 text-muted">
          {/* Tài Khoản Của Tôi */}
          <div className="block py-2 px-4 text-lg font-bold text-yellow-500 cursor-pointer">
            Tài Khoản Của Tôi
          </div>

          {/* Hồ Sơ button */}
          <Link to="/profile/userinfo">
            <button
              onClick={() => {
                toggleProfileDropdown();
                handleButtonClick("profile");
              }}
              className={`block w-full text-left py-2 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
                activeButton === "profile"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <MdOutlineManageAccounts className="inline-block mr-3" />
              Hồ Sơ
            </button>
          </Link>

          {/* Đơn hàng */}
          <Link
            to="/profile/order-history"
            onClick={() => handleButtonClick("order")}
            className={`block w-full text-left py-2 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
              activeButton === "order"
                ? "bg-gray-500 text-white"
                : "bg-gray-100"
            }`}
          >
            <CiViewList className="inline-block mr-3" />
            Đơn hàng
          </Link>

          {/* Thông báo */}
          <Link
            to="/profile/announcement"
            onClick={() => handleButtonClick("notification")}
            className={`block w-full text-left py-2 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
              activeButton === "notification"
                ? "bg-orange-500 text-white"
                : "bg-gray-100"
            }`}
          >
            <MdOutlineAnnouncement className="inline-block mr-3" />
            Thông báo
            {hasNewNotification && notificationsCount > 0 && (
              <span className="ml-24 bg-red-500 text-white rounded-full text-xs px-2 py-1 ml-2">
                {/* {notificationsCount} */}Mới
              </span>
            )}
          </Link>
        </nav>
      </aside>

      {/* Main Profile Section */}
      <div className="flex-1 h-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
