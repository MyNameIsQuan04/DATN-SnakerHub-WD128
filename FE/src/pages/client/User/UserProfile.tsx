import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { MdOutlineAnnouncement } from "react-icons/md";
import { BiCustomize } from "react-icons/bi";
import { useAuth } from "../../../contexts/AuthContext";

const UserProfile = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [activeDropdownItem, setActiveDropdownItem] = useState<string | null>(
    null
  );
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('User data updated:', user);
      // window.location.reload()
    }
  }, [user]);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setActiveDropdownItem(null); 
  };

  const handleDropdownItemClick = (itemName: string) => {
    setActiveDropdownItem(itemName);
    setActiveButton(null); 
  };

  return (
    <div className="container mx-auto p-6 sm:p-12 lg:p-24 min-h-screen flex flex-col md:flex-row gap-10">
      {/* Sidebar */}
      <aside className="sidebar w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-xl p-6">
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
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <MdOutlineManageAccounts className="inline-block mr-3" />
              Hồ Sơ
            </button>
          </Link>

          {/* Dropdown menu */}
          {isProfileDropdownOpen && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                to="/profile/userinfo"
                onClick={() => handleDropdownItemClick("userinfo")}
                className={`block py-2 px-4 rounded-xl transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
                  activeDropdownItem === "userinfo"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Thông Tin
              </Link>
              <Link
                to="/profile/address"
                onClick={() => handleDropdownItemClick("address")}
                className={`block py-2 px-4 rounded-xl transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
                  activeDropdownItem === "address"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Địa Chỉ
              </Link>
              <Link
                to="/profile/change-password"
                onClick={() => handleDropdownItemClick("change-password")}
                className={`block py-2 px-4 rounded-xl transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
                  activeDropdownItem === "change-password"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Đổi Mật Khẩu
              </Link>
            </div>
          )}

          {/* Đơn hàng */}
          <Link
            to="/profile/order-history"
            onClick={() => handleButtonClick("order")}
            className={`block w-full text-left py-2 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
              activeButton === "order"
                ? "bg-orange-500 text-white"
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
          </Link>

          {/* Cài đặt */}
          <Link
            to="#"
            onClick={() => handleButtonClick("settings")}
            className={`block w-full text-left py-2 px-4 rounded-xl font-semibold cursor-pointer transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-500 ${
              activeButton === "settings"
                ? "bg-orange-500 text-white"
                : "bg-gray-100"
            }`}
          >
            <BiCustomize className="inline-block mr-3" />
            Cài đặt
          </Link>
        </nav>
      </aside>

      {/* Main Profile Section with Outlet */}
      <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
