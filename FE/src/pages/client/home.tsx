import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";
import { Link } from "react-router-dom";
import SimpleSlider from "../../components/Slider";
import Slider from "react-slick";
import { getProductsClients } from "../../services/client/product";
import { GetCategoriesClient } from "../../services/client/category";
import { Category } from "../../interfaces/Category";

const Home = () => {
  const [productsClient, setProductsClient] = useState<Product[]>([]);
  const [productsTop10, setProductsTop10] = useState<Product[]>([]);
  const [categoriesClient, setCategoriesClient] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getProductsClients();
      const productsData = response.products || [];
      const productsTop10Data = response.top10 || [];
      setProductsClient(productsData.slice(0, 5));
      setProductsTop10(productsTop10Data.slice(0.5));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const response = await GetCategoriesClient();
      const categoriesData = response || [];
      setCategoriesClient(categoriesData);
    })();
  }, []);
  useEffect(() => {}, []);
  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <button
        className={`${className} z-10 left-[20px] text-white bg-black hover:bg-black transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center`}
        onClick={onClick}
      >
        &lt;
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <button
        className={`${className} z-10 right-[20px] text-white bg-black hover:bg-black transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center`}
        onClick={onClick}
      >
        &gt;
      </button>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Số sản phẩm hiển thị trên một slide
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <SimpleSlider />
      <div className="flex gap-[50px] justify-center  items-center py-[40px] bg-[#f2f2f2]">
        <div className="text-center w-[400px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-12 mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>

          <p className="font-bold text-[20px] text-[#f2611c]">
            CAM KÊT CHÍNH HÃNG
          </p>
          <p className="font-bold">100% Authentic</p>
          <p>Cam kết sản phẩm chính hàng tử Châu âu, Châu Mỹ...</p>
        </div>
        <div className="text-center w-[400px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-12 mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>

          <p className="font-bold text-[20px] text-[#f2611c]">
            GIAO HÀNG HỎA TỐC
          </p>
          <p className="font-bold">Express delivery</p>
          <p>SHIP hỏa tốc 1h nhận hàng trong nội thành HN</p>
        </div>
        <div className="text-center w-[400px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-12 mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <p className="font-bold text-[20px] text-[#f2611c]">HỖ TRỢ 24/24</p>
          <p className="font-bold">Supporting 24/24c</p>
          <p>Gọi ngay 0123456789</p>
        </div>
      </div>
      <div className="mt-[50px]">
        <p className="text-[30px] text-center text-[#f2611c] px-[40px] font-semibold">
          DANH MỤC SẢN PHẨM
        </p>
        <div className="flex justify-center gap-[30px] mt-[30px]">
          {categoriesClient.map((category: Category) => (
            <div className="w-36 bg-transparent items-center justify-center flex border-2 border-orange-500 shadow-lg hover:bg-orange-500 text-orange-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
              <button className="px-5 py-2">
                <a className="" href="">
                  {category.name}
                </a>
              </button>
            </div>
          ))}
        </div>
        <div className="my-[50px] flex justify-between items-center">
          <div className="relative flex flex-col justify-center pl-[40px]">
            {/* Dòng chữ NEWS làm background */}
            <p className="absolute text-[120px] text-[#d9d9d9] opacity-30 -z-10">
              NEWS
            </p>
            {/* Dòng chữ chính */}
            <p className="text-[28px] font-bold text-[#f2611c]">
              - BỘ SƯU TẬP MỚI
            </p>
          </div>
          <Link to={"/products"}>
            <p className="text-[18px] hover:underline  text-black px-[40px]">
              Xem tất cả
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-5 px-[40px] gap-[10px] mt-[30px]">
          {productsClient.map((product: Product) => (
            <Link to={`detail/${product.id}`} key={product.id}>
              <div className="relative border border-gray-200 hover:border-gray-400 transition duration-300">
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 ">
                  HOT
                </div>
                <div className="h-[245px] w-full overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Chỉ áp dụng hover vào phần tử chứa tên sản phẩm */}
                <div className="w-full px-2 mx-auto mt-3">
                  <div className="text-[19px] font-bold uppercase transition duration-300 hover:text-[#f2611c]">
                    {product.name}
                  </div>
                </div>

                <div className="flex items-center justify-between px-2">
                  <p className="text-[17px] uppercase pt-[5px] text-gray-400">
                    {product.category.name}
                  </p>
                  <div className="flex text-yellow-400 text-sm">
                    <span>⭐</span> <span>⭐</span> <span>⭐</span>{" "}
                    <span>⭐</span> <span>⭐</span>
                  </div>
                </div>

                <p className="text-[17px] px-2 font-bold py-[5px]">
                  {product.price.toLocaleString("vi-VN")} đ
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="my-[50px] flex justify-between items-center">
          <div className="relative flex flex-col justify-center pl-[40px]">
            {/* Dòng chữ NEWS làm background */}
            <p className="absolute text-[120px] text-[#d9d9d9] opacity-30 -z-10">
              BEST
            </p>
            {/* Dòng chữ chính */}
            <p className="text-[28px] font-bold text-[#f2611c]">
              - SẢN PHẨM BÁN CHẠY
            </p>
          </div>
          <p className="text-[18px] hover:underline text-black px-[40px]">
            Xem tất cả
          </p>
        </div>
        <div className="px-[40px]">
          <Slider {...settings} className="custom-slider">
            {productsTop10.map((product: Product) => (
              <div key={product.id} className="">
                <Link to={`detail/${product.id}`}>
                  <div className="relative border border-gray-200 hover:border-gray-400 transition duration-300">
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1">
                      HOT
                    </div>
                    <div className="h-[245px] w-full overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-full px-2 mx-auto mt-3">
                      <div className="text-[19px] font-bold uppercase transition duration-300 hover:text-[#f2611c]">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <p className="text-[17px] uppercase pt-[5px] text-gray-400">
                        {product.category.name}
                      </p>
                      <div className="flex text-yellow-400 text-sm">
                        <span>⭐</span> <span>⭐</span> <span>⭐</span>{" "}
                        <span>⭐</span> <span>⭐</span>
                      </div>
                    </div>
                    <p className="text-[17px] px-2 font-bold py-[5px]">
                      {product.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className="my-[50px] flex justify-between items-center">
          <div className="relative flex flex-col justify-center pl-[40px]">
            {/* Dòng chữ NEWS làm background */}
            <p className="absolute text-[120px] text-[#d9d9d9] opacity-30 -z-10">
              DISCOUNT
            </p>
            {/* Dòng chữ chính */}
            <p className="text-[28px] font-bold text-[#f2611c]">
              - SẢN PHẨM GIẢM GIÁ
            </p>
          </div>
          <p className="text-[18px]  text-black px-[40px]">Xem tất cả</p>
        </div>
        <div className="px-[40px]">
          <Slider {...settings} className="custom-slider">
            {productsClient.map((product: Product) => (
              <div key={product.id} className="gap-[10px]">
                <Link to={`detail/${product.id}`}>
                  <div className="relative border border-gray-200 hover:border-gray-400 transition duration-300">
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1">
                      HOT
                    </div>
                    <div className="h-[245px] w-full overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-full px-2 mx-auto mt-3">
                      <div className="text-[19px] font-bold uppercase transition duration-300 hover:text-[#f2611c]">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-2">
                      <p className="text-[17px] uppercase pt-[5px] text-gray-400">
                        {product.category.name}
                      </p>
                      <div className="flex text-yellow-400 text-sm">
                        <span>⭐</span> <span>⭐</span> <span>⭐</span>{" "}
                        <span>⭐</span> <span>⭐</span>
                      </div>
                    </div>
                    <p className="text-[17px] px-2 font-bold py-[5px]">
                      {product.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
