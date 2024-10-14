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
        <div className="w-1/6  bg-gray-800 text-white flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Hello Admin</h2>
            <ul className="space-y-4">
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
        </div>
        <div className="w-3/4 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
