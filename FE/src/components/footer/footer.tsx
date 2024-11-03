const Footer = () => {
  return (
    <div className="mx-auto w-full bg-white">
      <hr className="border-t-2 border-gray-400 my-4" />
      <div className="flex flex-col md:flex-row justify-around mx-4">
        {/* class 1 : */}
        <div className="bg-white w-full md:w-[410px] h-auto md:h-[200px] mb-4 md:mb-0">
          <div className="p-4">
            <h1 className="">GỌI MUA HÀNG ONLINE (08:00 - 21: 00 mỗi ngày)</h1>
            <h2 className="font-medium text-black hover:underline hover:text-blue-600 transition-colors duration-300">
              1900.633.349
            </h2>
            <h3>Tất cả các ngày trong tuần (Trừ tết Âm Lịch)</h3>
          </div>
          <div className="p-4">
            <h1>GỌI MUA HÀNG ONLINE (08:00 - 21: 00 mỗi ngày)</h1>
            <h2 className="font-medium text-black hover:underline hover:text-blue-600 transition-colors duration-300">
              1900.633.349
            </h2>
            <h3>Tất cả các ngày trong tuần (Trừ tết Âm Lịch)</h3>
          </div>
        </div>
        {/* class 2  : */}
        <div className="bg-white w-full md:w-[410px] h-auto md:h-[200px] mb-4 md:mb-0">
          <div className="p-4">
            <h1 className="font-medium">Thông tin</h1>
            <ul className="p-2">
              <li className="mb-[10px] hover:text-blue-600 transition-colors duration-300 hover:underline">
                <i className="fa-solid fa-chevron-right" /> Thông tin Website
                thương mại điện tử
              </li>
              <li className="mb-[10px] hover:text-blue-600 transition-colors duration-300 hover:underline">
                <i className="fa-solid fa-chevron-right" /> Giới thiệu về MWC
              </li>
              <li className="mb-[10px] hover:text-blue-600 transition-colors duration-300 hover:underline">
                <i className="fa-solid fa-chevron-right" /> Than Phiền Góp Ý
              </li>
              <li className="mb-[10px] hover:text-blue-600 transition-colors duration-300 hover:underline">
                <i className="fa-solid fa-chevron-right" /> Chính sách và quy
                định
              </li>
            </ul>
          </div>
        </div>
        {/* class3 : */}
        <div className="bg-white w-full md:w-[410px] h-auto md:h-[200px] mb-4 md:mb-0">
          <div className="p-4">
            <h1 className="font-medium">Thông tin</h1>
            <ul className="p-2">
              <li className="mb-[10px] hover:text-blue-600 transition-colors duration-300 hover:underline">
                <i className="fa-solid fa-chevron-right" /> Vận chuyển
              </li>
              <li className="mb-[10px] hover:text-blue-600 transition-colors duration-300 hover:underline">
                <i className="fa-solid fa-chevron-right" /> Chính sách đổi trả
              </li>
              <li className="mb-[10px] hover:text-blue-600 transition-colors duration-300 hover:underline">
                <i className="fa-solid fa-chevron-right" /> Chính sách đổi trả
                bảo hành
              </li>
            </ul>
            <div className="flex space-x-2 mt-4">
              <button>
                <i className="fa-brands fa-facebook" />
              </button>
              <button>
                <i className="fa-brands fa-instagram" />
              </button>
              <button>
                <i className="fa-brands fa-youtube" />
              </button>
              <button>
                <i className="fa-solid fa-cart-shopping" />
              </button>
              <button>
                <i className="fa-brands fa-tiktok" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Phần 2 */}
      <footer className="bg-gray-800 text-white pt-10">
        <div className="container  grid grid-cols-1 md:grid-cols-4 gap-8 mx-[50px]">
          {/* Thông tin công ty */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Công ty</h3>
            <p>SneakerHub Việt Nam</p>
            <p>Địa chỉ: 123 Đường ABC, Hà Nội</p>
            <p>SĐT: 0123 456 789</p>
            <p>Email: support@sneakerhub.vn</p>
          </div>
          {/* Liên kết hữu ích */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>
          {/* Danh mục sản phẩm */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Giày nam
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Giày nữ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Giày thể thao
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold mb-4">Chứng nhận</h3>

            <img
              src="https://myshoes.vn/image/catalog/logo/logo-bct.png"
              alt=""
              className="w-[200px]"
            />
          </div>
        </div>
        <div className="mt-[20px] text-center bg-gray-900 py-[8px]">
          © Copyright 2024 By SneakerHub.vn. Powered by Haravan
        </div>
      </footer>
    </div>
  );
};

export default Footer;
