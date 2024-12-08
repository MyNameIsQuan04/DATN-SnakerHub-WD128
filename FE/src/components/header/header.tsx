import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
// import axios from "axios";
import api from "../../configs/axios";
import { Category } from "../../interfaces/Category";
import { GetCategoriesClient } from "../../services/client/category";
import axios from "axios";

const Header = () => {
  const [categoriesClient, setCategoriesClient] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      const response = await GetCategoriesClient();
      const categoriesData = response || [];
      setCategoriesClient(categoriesData);
    })();
  }, []);
  const { user, isLoggedIn, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Get Categories
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/client/categories"
      );
      setCategories(res.data);
    };
    fetchCategories();
  });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    try {
      const response = await api.get("search", {
        params: { keyword },
      });

      console.log(response.data.products);
      navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
    } catch (err) {
      console.error("Có lỗi xảy ra khi tìm kiếm", err);
    }
  };
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-14 py-3 border-b border-gray-200 mb-0">
        {/* Logo */}
        <div className="flex items-center w-[279px]">
          <a href="/">
            <img
              src="https://i.imgur.com/jInJnWw.png"
              alt="SneakerHub Logo"
              className="h-16 w-auto mx-auto p-2 rounded-md shadow-lg"
            />
          </a>
        </div>
        <nav className="flex justify-center space-x-6 text-base font-medium text-gray-800">
          {categoriesClient.map((category: Category) => (
            <ul key={category.id}>
              <li className="relative group">
                <Link
                  to={`/products?categoryId=${category.id}`}
                  className="hover:text-gray-900 uppercase"
                >
                  {category.name}
                </Link>
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          ))}

          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Khuyến mãi
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
          {/* Sản phẩm mới */}
          <ul>
            <li className="relative group">
              <Link to={"/contact"}>
                <a href="#" className="hover:text-gray-900">
                  Liên hệ
                </a>
              </Link>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
          {/* Sản phẩm bán chạy */}
          <ul>
            <li className="relative group">
              <a href="#" className="hover:text-gray-900">
                Về chúng tôi
              </a>
              <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        </nav>

        {/* Search and Icons Section (Right) */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center border rounded-full px-3 py-1 w-[200px]"
          >
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm"
              className="w-full px-3 py-1 text-gray-700 focus:outline-none"
            />
          </form>

          <div className="flex gap-[15px] text-gray-700 ">
            {isLoggedIn ? (
              <Link to={"/cart"}>
                {/* Giỏ hàng */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </Link>
            ) : (
              <button
                onClick={() =>
                  alert("Bạn cần đăng nhập để sử dụng chức năng giỏ hàng.")
                }
              >
                {/* Giỏ hàng (khóa khi chưa đăng nhập) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
            )}

            {/* Tài khoản */}
            <div className="relative">
              {isLoggedIn ? (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {/* <img src={user?.avatar} className="w-8 h-8 rounded-full"/> */}
                  <span className="font-semibold">{user?.name}</span>

                  {/* Dropdown menu */}
                  {dropdownVisible && (
                    <nav className="absolute right-0 mt-[200px] w-48 bg-white rounded-md z-10 shadow-lg transition-transform transform-gpu duration-200 ease-in-out origin-top-right scale-95 hover:scale-100">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile/userinfo"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150 ease-in-out hover:text-black hover:scale-105"
                          >
                            Hồ sơ của tôi
                          </Link>
                        </li>
                        {user?.type === "admin" && (
                          <li>
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-150 ease-in-out hover:text-black hover:scale-105"
                            >
                              Admin Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <button
                            onClick={logout}
                            className="w-full flex items-center text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition duration-150 ease-in-out transform hover:scale-105"
                          >
                            <p className="mr-2">Đăng xuất</p>
                            <IoLogOutOutline className="text-lg" />
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
