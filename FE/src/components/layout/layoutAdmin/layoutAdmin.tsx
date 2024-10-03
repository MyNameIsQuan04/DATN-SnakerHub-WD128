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
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const LayoutAdmin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar cố định, có thể cuộn */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col z-50
            ${isSidebarOpen ? "w-2/3 sm:w-1/3 md:w-1/4" : "w-0"}
            transition-all duration-300 overflow-hidden lg:w-1/6 lg:block`}
        >
          {/* Phần avatar và Hello Admin cố định */}
          <div className="p-6 flex flex-col items-center sticky top-0 bg-gray-800 z-10">
            <img
              src="https://via.placeholder.com/150"
              alt="Admin Avatar"
              className="w-[120px] h-[120px] rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-6">Hello Admin</h2>
          </div>

          {/* Danh sách các mục sidebar với cuộn */}
          <div className="overflow-y-auto flex-1 p-6">
            <ul className="space-y-4 w-full">
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/admin"
                >
                  <FaTachometerAlt className="mr-2" />
                  Thống kê
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/admin/users"
                >
                  <FaUser className="mr-2" />
                  Người dùng
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/admin/product"
                >
                  <FaProductHunt className="mr-2" />
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/admin/category"
                >
                  <FaList className="mr-2" />
                  Danh mục
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/admin/color"
                >
                  <IoColorPaletteOutline className="mr-2" />
                  Danh mục màu sắc
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/admin/size"
                >
                  <CgSize className="mr-2" />
                  Danh mục kích cỡ
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/admin/order"
                >
                  <FaShoppingCart className="mr-2" />
                  Đơn hàng
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-400"
                  to="/"
                >
                  <FaHome className="mr-2" />
                  Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Nút Logout */}
          <div className="p-6">
            <button className="text-xl w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group hover:text-white duration-1000">
              <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Logout
            </button>
          </div>
        </div>

        {/* Nút toggle sidebar cho mobile */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="bg-gray-800 text-white p-3 rounded-full focus:outline-none"
          >
            {isSidebarOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Nội dung cuộn bên phải */}
        <div
          className={`ml-0 lg:ml-[16.666%] w-full lg:w-5/6 p-6 overflow-auto h-screen transition-all duration-300`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
