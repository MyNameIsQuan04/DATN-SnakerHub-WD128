const Footer = () => {
  return (
    <div className=" bg-white">
      {/* Phần đầu Footer */}
      <hr className="border-t-2 border-gray-400 my-4" />
      <div className="flex flex-col md:flex-row justify-around mx-4">
        {/* class 1 : */}
        <div className="bg-white w-full md:w-[410px] h-auto md:h-[200px] mb-4 md:mb-0">
          <div className="p-4">
            <h1 className="">GỌI MUA HÀNG ONLINE (08:00 - 21: 00 mỗi ngày)</h1>
            <h2 className="font-medium text-black hover:underline hover:text-blue-600 transition-colors duration-300">
              0917122991
            </h2>
            <h3>Tất cả các ngày trong tuần (Trừ tết Âm Lịch)</h3>
          </div>
          <div className="p-4">
            <h1>GỌI MUA HÀNG ONLINE (08:00 - 21: 00 mỗi ngày)</h1>
            <h2 className="font-medium text-black hover:underline hover:text-blue-600 transition-colors duration-300">
              0917122991
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
                <i className="fa-solid fa-chevron-right" /> Giới thiệu về
                SnakerHUB
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

      {/* Phần 2 Footer */}
      <footer className="bg-gray-800 text-white pt-10 mt-[60px]">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-4 md:px-8">
          {/* Thông tin công ty */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Công ty</h3>
            <p>SneakerHub Việt Nam</p>
            <p>Địa chỉ: 123 Đường ABC, Hà Nội</p>
            <p>SĐT: 0917 122 991</p>
            <p>Email: snakerhub2024@gmail.com</p>
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

          {/* Chứng nhận */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Chứng nhận</h3>
            <img
              src="https://myshoes.vn/image/catalog/logo/logo-bct.png"
              alt=""
              className="w-[200px]"
            />
          </div>
        </div>
        <div className="mt-[20px] text-center bg-gray-900 py-[8px]">
          © Copyright 2024 By SnakerHub.vn. Powered by Haravan
        </div>
      </footer>
    </div>
  );
};

export default Footer;
