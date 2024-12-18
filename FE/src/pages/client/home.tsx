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

      <div className="mt-[50px]">
        <p className="text-[30px] text-center text-[#f2611c] px-[40px] font-semibold">
          DANH MỤC SẢN PHẨM
        </p>
        <div className="flex justify-center gap-[30px] mt-[30px]">
          {categoriesClient
            .filter((category: Category) => category.name !== "Chưa phân loại") // Loại bỏ danh mục "Chưa phân loại"
            .map((category: Category) => (
              <div
                key={category.id} // Nên thêm key để React quản lý danh sách tốt hơn
                className="w-36 bg-transparent items-center justify-center flex border-2 border-orange-500 shadow-lg hover:bg-orange-500 text-orange-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]"
              >
                <button className="px-5 py-2">
                  <a href={`/products?categoryId=${category.id}`}>
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
