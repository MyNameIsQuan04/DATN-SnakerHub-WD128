import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 mx-auto w-full h-auto bg-gray-300 p-4 px-[60px] flex items-center justify-between ">
        <div className="flex items-center space-x-4 md:space-x-8">
          <img
            src="./accest/Logo.png"
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
                  GIÁ ƯU ĐÃI
                </a>
              </li>
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
                  GIẢM 50%
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
              className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="slate-300"
                viewBox="0 0 24 24"
                height={24}
                width={24}
              >
                <path d="M10.979 16.8991C11.0591 17.4633 10.6657 17.9926 10.0959 17.9994C8.52021 18.0183 6.96549 17.5712 5.63246 16.7026C4.00976 15.6452 2.82575 14.035 2.30018 12.1709C1.77461 10.3068 1.94315 8.31525 2.77453 6.56596C3.60592 4.81667 5.04368 3.42838 6.82101 2.65875C8.59833 1.88911 10.5945 1.79039 12.4391 2.3809C14.2837 2.97141 15.8514 4.21105 16.8514 5.86977C17.8513 7.52849 18.2155 9.49365 17.8764 11.4005C17.5979 12.967 16.8603 14.4068 15.7684 15.543C15.3736 15.9539 14.7184 15.8787 14.3617 15.4343C14.0051 14.9899 14.0846 14.3455 14.4606 13.9173C15.1719 13.1073 15.6538 12.1134 15.8448 11.0393C16.0964 9.62426 15.8261 8.166 15.0841 6.93513C14.3421 5.70426 13.1788 4.78438 11.81 4.34618C10.4412 3.90799 8.95988 3.98125 7.641 4.55236C6.32213 5.12348 5.25522 6.15367 4.63828 7.45174C4.02135 8.74982 3.89628 10.2276 4.28629 11.6109C4.67629 12.9942 5.55489 14.1891 6.75903 14.9737C7.67308 15.5693 8.72759 15.8979 9.80504 15.9333C10.3746 15.952 10.8989 16.3349 10.979 16.8991Z" />
                <rect
                  transform="rotate(-49.6812 12.2469 14.8859)"
                  rx={1}
                  height="10.1881"
                  width={2}
                  y="14.8859"
                  x="12.2469"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 sm:space-x-6 items-center ml-[20px] mr-[50px]">
          <button className="w-[30px] h-auto">
            {/* <img
              src="./accest/account_circle.png"
              alt="Account"
              className="rounded-[5px] w-[30px] h-auto cursor-pointer"
            /> */}
            <VscAccount className="w-[30px] h-auto" />
          </button>
          <button className="w-[30px] h-auto">
            {/* <img
              src="./accest/Shopping cart.png"
              alt="Cart"
              className="rounded-[5px] w-[30px] h-auto cursor-pointer"
            /> */}
            <FiShoppingCart className="w-[30px] h-auto" />
          </button>
        </div>
      </header>
      ;
    </div>
  );
};

export default Header;
