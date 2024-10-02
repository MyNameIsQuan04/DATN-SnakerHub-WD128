const Footer = () => {
  return (
    <div className="mx-auto max-w-[1440px] bg-white">
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
      <div className="mt-6">
        <h1 className="text-center font-medium text-[20px]">
          Hệ thống các cửa hàng{" "}
        </h1>
        <h2 className="text-center hover:text-gray-500 transition-colors duration-300">
          Xem địa chỉ các cửa hàng{" "}
        </h2>
        <div className="flex flex-col md:flex-row justify-around mx-4 bg-gray-400 ">
          {/* class 1 : */}
          <div className=" w-full md:w-[410px] h-auto md:h-[200px] mb-4 md:mb-0">
            <div className="p-4">
              <h1 className="text-center text-white font-medium">
                KHU VỰC TP.HCM
              </h1>
              <div className="mt-[20px]">
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* class 2  : */}
          <div className=" w-full md:w-[410px] h-auto md:h-[200px] mb-4 md:mb-0">
            <div className="p-4">
              <h1 className="text-center text-white font-medium">
                KHU VỰC MIỀN BẮC
              </h1>
              <div className="mt-[20px]">
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* class3 : */}
          <div className=" w-full md:w-[410px] h-auto md:h-[200px] mb-4 md:mb-0">
            <div className="p-4">
              <h1 className="text-center text-white font-medium">
                KHU VỰC MIỀN TRUNG
              </h1>
              <div className="mt-[20px]">
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
                <div className="text-white flex gap-[5px] mt-[10px]">
                  <img
                    src="./accest/icon_map.png"
                    alt=""
                    className="w-[20px] h-auto"
                  />
                  <h3>414-416 Nguyễn Trãi, P.8, Q5.</h3>
                  <a
                    href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/"
                    className="text-red-600 hover:underline transition-colors duration-300 hover:text-gray-600"
                  >
                    TP. Hồ Chí Minh
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
