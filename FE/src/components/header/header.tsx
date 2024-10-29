import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaUserGear } from "react-icons/fa6";

const Header = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 mx-auto w-full h-auto bg-gray-300 p-4 px-[60px] flex items-center justify-between ">
        <div className="flex items-center space-x-4 md:space-x-8">
          <img
            src="/assets/Snaker.png"
            alt="Logo"
            className="rounded-full w-auto h-auto"
          />
          <div className="hidden md:block ml-[50px]">
            <ul className="flex flex-wrap space-x-4 md:space-x-8 items-center">
              <li className="relative group">
                <a
                  href="#"
                  className="text-black font-bold hover:text-gray-600 cursor-pointer border-b-2 border-transparent group-hover:border-black transition-all duration-300"
                >
                  GIÀY NAM
                </a>
                <ul className="absolute hidden group-hover:flex flex-col bg-gray-400 text-black mt-2 p-2 rounded-md w-[150px] md:w-[200px]">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      Our History
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      Mission &amp; Vision
                    </a>
                  </li>
                </ul>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className="text-black font-bold hover:text-gray-600 cursor-pointer border-b-2 border-transparent group-hover:border-black transition-all duration-300"
                >
                  GIÀY NỮ
                </a>
                <ul className="absolute hidden group-hover:flex flex-col bg-gray-400 text-black mt-2 p-2 rounded-md w-[150px] md:w-[200px]">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      App Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      Digital Marketing
                    </a>
                  </li>
                </ul>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className="text-black font-bold hover:text-gray-600 cursor-pointer border-b-2 border-transparent group-hover:border-black transition-all duration-300"
                >
                  GIÀY CẶP
                </a>
                <ul className="absolute hidden group-hover:flex flex-col bg-gray-400 text-black mt-2 p-2 rounded-md w-[150px] md:w-[200px]">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      App Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 font-medium hover:bg-gray-500"
                    >
                      Digital Marketing
                    </a>
                  </li>
                </ul>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className="text-black font-bold hover:text-gray-600 cursor-pointer border-b-2 border-transparent group-hover:border-black transition-all duration-300"
                >
                  BALO-TÚI
                </a>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className="text-black font-bold hover:text-gray-600 cursor-pointer border-b-2 border-transparent group-hover:border-black transition-all duration-300"
                >
                  SẢN PHẨM BÁN CHẠY
                </a>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className="text-black font-bold hover:text-gray-600 cursor-pointer border-b-2 border-transparent group-hover:border-black transition-all duration-300"
                >
                  PHỤ KIỆN
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative w-[150px] sm:w-[200px] md:w-[300px]">
            <input
              placeholder="Search..."
              className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
              id="floating_outlined"
              type="text"
            />
            <label
              className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              htmlFor="floating_outlined"
            >
              Search...
            </label>
            <div className="absolute top-3 right-3">
              <BiSearch className="text-slate-300 w-[24px] h-auto" />{" "}
              {/* Sử dụng BiSearch */}
            </div>
          </div>
        </div>
        <div className="flex space-x-4 sm:space-x-6 items-center ml-[20px] mr-[50px]">
          <Link to={"/login"}>
            <FaUserGear className="w-[30px] h-auto" />
          </Link>
          <Link to={"/cart"}>
            <FiShoppingCart className="w-[30px] h-auto" />
          </Link>
        </div>
      </header>
      ;
    </div>
  );
};

export default Header;
