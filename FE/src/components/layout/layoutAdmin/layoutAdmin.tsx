import { useEffect, useState, useRef } from "react";
import {
  FaCommentAlt,
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
import axios from "axios";
import { Order } from "../../../interfaces/Order";
import path from "path";

const LayoutAdmin = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [hasNewOrder, setHasNewOrder] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orders, setOrders] = useState<Order[]>([]);
  const prevOrdersRef = useRef<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/orders");
      const fetchedOrders: Order[] = response.data;

      // Kiểm tra sự thay đổi chi tiết của từng đơn hàng
      let hasChange = false;
      for (const fetchedOrder of fetchedOrders) {
        const prevOrder = prevOrdersRef.current.find(
          (order) => order.id === fetchedOrder.id
        );
        if (
          !prevOrder ||
          JSON.stringify(prevOrder) !== JSON.stringify(fetchedOrder)
        ) {
          hasChange = true;
          break;
        }
      }

      if (hasChange) {
        setHasNewOrder(true);
        setOrders(fetchedOrders);
      }

      // Lưu lại dữ liệu hiện tại để so sánh lần sau
      prevOrdersRef.current = fetchedOrders;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchOrders, 5000);
    fetchOrders();
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      path: "/admin",
      icon: <FaTachometerAlt className="mr-2" />,
      label: "Bảng điều khiển",
    },
    {
      path: "/admin/notification",
      icon: (
        <div className="relative cursor-pointer">
          <MdOutlineNotificationsActive className="mr-2" />
          {hasNewOrder && (
            <span className="absolute top-[-5px] right-[-160px] p-2 bg-red-500 text-white text-xs font-bold rounded-md h-5 w-8 flex items-center justify-center animate-bounce shadow-lg">
              Mới
            </span>
          )}
        </div>
      ),
      label: "Thông báo",
      onClick: () => setHasNewOrder(false), // Ẩn thông báo khi nhấn vào
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
      icon: <FaCommentAlt className="mr-2" />,
      label: "Đánh giá & Bình luận",
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
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
                        <p className="font-semibold text-red-500">
                          Quản trị {user?.name}
                        </p>
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
