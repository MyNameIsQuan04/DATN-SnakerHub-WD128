import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <div>
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center w-[279px]">
          <a href="#">
            <img src="logo-nike.png" alt="SneakerHub Logo" className="h-8" />
          </a>
        </div>

        <nav className="flex justify-center space-x-6 text-base font-medium text-gray-800">
          {/* Giày nam */}
          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Giày nam
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              <ul className="absolute left-0 hidden  mt-1 w-40 bg-white shadow-lg opacity-0 group-hover:block transition-opacity duration-300 group-hover:opacity-100 z-10">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày chạy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày bóng rổ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày đi bộ
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Giày nữ */}
          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Giày nữ
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              <ul className="absolute left-0 hidden  mt-1 w-40 bg-white shadow-lg opacity-0 group-hover:block transition-opacity duration-300 group-hover:opacity-100 z-10">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày thể thao
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày cao gót
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày bệt
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Phụ kiện */}
          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Phụ kiện
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              <ul className="absolute left-0 hidden  mt-1 w-40 bg-white shadow-lg opacity-0 group-hover:block transition-opacity duration-300 group-hover:opacity-100 z-10">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Túi xách
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Tất
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Mũ
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Khuyến mãi */}

          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Khuyến mãi
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              <ul className="absolute left-0 hidden  mt-1 w-40 bg-white shadow-lg opacity-0 group-hover:block transition-opacity duration-300 group-hover:opacity-100 z-10">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giảm giá 50%
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày đi bộ
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Sản phẩm mới */}
          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Sản phẩm mới
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              <ul className="absolute left-0 hidden  mt-1 w-40 bg-white shadow-lg opacity-0 group-hover:block transition-opacity duration-300 group-hover:opacity-100 z-10">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Áo mới
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày mới
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày đi bộ
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* Sản phẩm bán chạy */}
          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Sản phẩm bán chạy
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              <ul className="absolute left-0 hidden  mt-1 w-40 bg-white shadow-lg opacity-0 group-hover:block transition-opacity duration-300 group-hover:opacity-100 z-10">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Giày bán chạy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Áo bán chạy
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Search and Icons Section (Right) */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex items-center border rounded-full px-3 py-1 w-[200px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6  "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full px-3 py-1 text-gray-700 focus:outline-none "
            />
          </div>

          <div className="flex gap-[15px] text-gray-700 ">
            <Link to={"/cart"}>
              {/* Giỏ hàng */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 hover:text-gray-900"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>

            {/* Tài khoản */}
            <div className="relative">
              {isLoggedIn ? (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="font-semibold">{user.name}</span>

                  {/* Dropdown menu */}
                  {dropdownVisible && (
                    <nav className="absolute right-0 mt-[200px] w-48 bg-white rounded-md z-10 shadow-lg">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/order-history"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Lịch sử đơn hàng
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/change-password"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Đổi mật khẩu
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 hover:text-gray-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
