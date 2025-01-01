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
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Outlet, Link, useLocation } from "react-router-dom";
import { RiDiscountPercentFill } from "react-icons/ri";
import { useAuth } from "../../../contexts/AuthContext";
import { AiFillSetting } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";

const LayoutAdmin = () => {
  const { user, logout } = useAuth();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Danh sách menu items
  const menuItems = [
    {
      path: "/admin",
      icon: <FaTachometerAlt className="mr-2" />,
      label: "Bảng điều khiển",
    },
    {
      path: "/admin/notification",
      icon: <MdOutlineNotificationsActive className="mr-2" />,
      label: "Thông báo",
    },
    {
      path: "/admin/user",
      icon: <FaUser className="mr-2" />,
      label: "Người dùng",
    },
    {
      path: "/admin/product",
      icon: <FaProductHunt className="mr-2" />,
      label: "Sản phẩm",
    },
    {
      path: "/admin/category",
      icon: <FaList className="mr-2" />,
      label: "Danh mục",
    },
    {
      path: "/admin/color",
      icon: <IoColorPaletteOutline className="mr-2" />,
      label: "Danh mục màu sắc",
    },
    {
      path: "/admin/size",
      icon: <CgSize className="mr-2" />,
      label: "Danh mục kích cỡ",
    },
    {
      path: "/admin/vouchers",
      icon: <RiDiscountPercentFill className="mr-2" />,
      label: "Vouchers",
    },
    {
      path: "/admin/order",
      icon: <FaShoppingCart className="mr-2" />,
      label: "Đơn hàng",
    },
    {
      path: "/admin/comments",
      icon: <BiSolidCommentDetail className="mr-2" />,
      label: "Bình luận - Đánh giá",
    },
    {
      path: "/admin/slides",
      icon: <AiFillSetting className="mr-2" />,
      label: "Cài đặt Slide",
    },
    { path: "/", icon: <FaHome className="mr-2" />, label: "Client" },
  ];

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="fixed top-0 left-0 w-1/6 h-full bg-gray-700 text-white flex flex-col">
          <div className="p-6 flex flex-col items-center fixed top-0 left-0 w-1/6 bg-gray-700">
            <img
              src="https://i.imgur.com/jInJnWw.png"
              alt="SneakerHub Logo"
              className="h-28 w-36 mx-auto p-2 rounded-md shadow-lg"
            />
          </div>

          {/* Menu có thể cuộn */}
          <div className="mt-32 p-8 overflow-y-auto scrollbar-hide">
            <ul className="space-y-4 w-full">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 
                ${
                  location.pathname === item.path
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nội dung cuộn bên phải */}
        <div className="ml-[16.666%] w-5/6 p-6 overflow-auto h-screen scrollbar-hide">
          <div className="bg-white border border-gray-300 mb-4 rounded-lg shadow-md px-6 py-4 flex items-center justify-between">
            <div className="flex items-center"></div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col text-right">
                <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                  <div>
                    <span>Hi,</span>
                    <span className="">
                      {user?.role_id === 1 && (
                        <div className="flex gap-2 items-center">
                          <p className="font-semibold">Quản trị</p>
                          <p className="font-semibold text-green-400">
                            {user?.name}
                          </p>
                        </div>
                      )}
                      {user?.role_id === 2 && (
                        <p className="font-semibold text-emerald-500">
                          Nhân viên {user?.name}
                        </p>
                      )}
                    </span>
                  </div>

                  <button
                    className={`mt-2 px-6 py-2 rounded-lg text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                      user?.role_id === 1
                        ? "bg-red-500 hover:bg-red-600 focus:ring-red-400"
                        : "bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400"
                    }`}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </h2>
              </div>

              <img
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-md"
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
