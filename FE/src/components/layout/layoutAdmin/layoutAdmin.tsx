import {
  FaHome,
  FaList,
  FaProductHunt,
  FaShoppingCart,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
import { CgSize } from "react-icons/cg";

import { Outlet, Link, useLocation } from "react-router-dom";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useAuth } from "../../../contexts/AuthContext";

const LayoutAdmin = () => {
  const { user,logout } = useAuth();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Danh sách menu items
  const menuItems = [
    { path: "/admin", icon: <FaTachometerAlt className="mr-2" />, label: "Bảng điều khiển" },
    { path: "/admin/user", icon: <FaUser className="mr-2" />, label: "Người dùng" },
    { path: "/admin/product", icon: <FaProductHunt className="mr-2" />, label: "Sản phẩm" },
    { path: "/admin/category", icon: <FaList className="mr-2" />, label: "Danh mục" },
    { path: "/admin/color", icon: <IoColorPaletteOutline className="mr-2" />, label: "Danh mục màu sắc" },
    { path: "/admin/size", icon: <CgSize className="mr-2" />, label: "Danh mục kích cỡ" },
    { path: "/admin/vouchers", icon: <RiDiscountPercentFill className="mr-2" />, label: "Vouchers" },
    { path: "/admin/order", icon: <FaShoppingCart className="mr-2" />, label: "Đơn hàng" },
    { path: "/", icon: <FaHome className="mr-2" />, label: "Client" },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar cố định */}
        <div className="fixed top-0 left-0 w-1/6 h-full bg-gray-700 text-white flex flex-col justify-between">
          <div className="p-6 flex flex-col items-center">
            {/* Avatar Admin */}
            <img
              src="https://i.imgur.com/jInJnWw.png"
              alt="SneakerHub Logo"
              className="h-28 w-36 mx-auto p-2 rounded-md shadow-lg"
            />
            <ul className="mt-6 space-y-4 w-full">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 
                      ${
                        location.pathname === item.path
                          ? "bg-white text-black" // Active state
                          : "text-white hover:bg-white hover:text-black" // Hover state
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6">
            <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-200" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {/* Nội dung cuộn bên phải */}
        <div className="ml-[16.666%] w-5/6 p-6 overflow-auto h-screen">
          <div className="bg-white border border-gray-300 mb-4 rounded-lg shadow-md px-6 py-4 flex items-center justify-between">
            {/* Form tìm kiếm */}
            <div className="flex items-center">

            </div>

            {/* Thông tin admin */}
            <div className="flex items-center">
              <div className="ml-4 text-right">
                <h2 className="text-xl font-semibold text-gray-800">
                  Hi,{" "}
                  <span className="font-semibold">{user?.name}</span>
                </h2>
              </div>
              <img
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="Admin Avatar"
                className="w-16 h-16 ml-4 rounded-full object-cover border border-gray-300"
              />
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
