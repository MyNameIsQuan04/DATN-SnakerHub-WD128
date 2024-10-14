import {
  FaHome,
  FaList,
  FaProductHunt,
  FaShoppingCart,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar cố định */}
        <div className="fixed top-0 left-0 w-1/6 h-full bg-gray-800 text-white flex flex-col">
          <div className="p-6 flex flex-col items-center">
            {/* Avatar Admin */}
            <img
              src="https://via.placeholder.com/150"
              alt="Admin Avatar"
              className="w-[120px] h-[120px] rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-6">Hello Admin</h2>
            <ul className="space-y-4 w-full">
              {/* Các mục sidebar */}
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
                  className="flex items-center text-white hover:text-gray-300"
                  to="/admin/users"
                >
                  <FaUser className="mr-2" />
                  Người dùng
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-300"
                  to="/admin/product"
                >
                  <FaProductHunt className="mr-2" />
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-300"
                  to="/admin/category"
                >
                  <FaList className="mr-2" />
                  Danh mục
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-300"
                  to="/admin/color"
                >
                  <FaList className="mr-2" />
                  Danh mục màu sắc
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-300"
                  to="/admin/size"
                >
                  <FaList className="mr-2" />
                  Danh mục kích cỡ
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-300"
                  to="/admin/order"
                >
                  <FaShoppingCart className="mr-2" />
                  Đơn hàng
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center text-white hover:text-gray-300"
                  to="/"
                >
                  <FaHome className="mr-2" />
                  Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Nút Logout */}
          <div className="mt-auto p-6">
            <button className="text-xl w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group hover:text-white duration-1000">
              <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Logout
            </button>
          </div>
        </div>

        {/* Nội dung cuộn bên phải */}
        <div className="ml-[16.666%] w-5/6 p-6 overflow-auto h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
