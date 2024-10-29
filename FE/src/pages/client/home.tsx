import { useContext } from "react";
import { ProductCT } from "../../contexts/ProductContext";
import { Product } from "../../interfaces/Product";
import { Link } from "react-router-dom";
import { CategoryCT } from "../../contexts/CategoryContext";
import { Category } from "../../interfaces/Category";

const Home = () => {
  const { products } = useContext(ProductCT);
  const { categories } = useContext(CategoryCT);
  const bestSellers = products.slice(0, 5);
  const favouriteProducts = products.slice(5, 10);
  return (
    <div className="">
      <div className="">BANNER</div>
      <div className="mt-[400px]">
        <p className="text-[30px] text-center text-[#f2611c] px-[40px] font-semibold">
          DANH MỤC SẢN PHẨM
        </p>
        <div className="flex justify-center gap-[60px] mt-[30px]">
          {categories.map((category: Category) => (
            <div className="bg-slate-200 w-[100px] h-[50px] flex justify-center items-center shadow-lg rounded-lg hover:bg-[#f2611c] transition duration-300">
              <span className="text-[20px] hover:text-[22px] flex items-center text-black hover:text-white">
                {category.name}
              </span>
            </div>
          ))}
        </div>
        <div className="my-[50px] flex justify-between items-center">
          <p className="text-[28px]  text-[#f2611c] px-[40px]">
            BỘ SƯU TẬP MỚI
          </p>
          <p className="text-[18px]  text-black px-[40px]">Xem tất cả</p>
        </div>
        <div className="grid grid-cols-5 px-[40px] gap-[10px] mt-[30px]">
          {bestSellers.map((product: Product) => (
            <Link to={`detail/${product.id}`} key={product.id}>
              <div className="relative shadow-lg rounded-lg transition duration-300">
                <div className="p-[5px]">
                  <div className="h-[245px] w-full overflow-hidden">
                    <img
                      src="https://picsum.photos/300/300"
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition ease-in-out duration-500 hover:opacity-100">
                    <div className="text-white text-2xl flex justify-center items-center gap-10">
                      <a
                        href="#"
                        className="hover:scale-125 transform transition ease-in-out duration-300 w-[40.14px] h-[34px] bg-white flex justify-center items-center rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5 text-[#f2611c]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="hover:scale-125 transform transition ease-in-out duration-300 w-[40.14px] h-[34px] bg-[#f2611c] flex justify-center items-center rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="hover:scale-125 transform transition ease-in-out duration-300 w-[40.14px] h-[34px] bg-white flex justify-center items-center rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5 text-[#f2611c]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="rounded-[8px] w-full text-[17px] text-[#b4b4b4] text-center mx-auto mt-3">
                    {product.category.name}
                  </div>
                  <div className="flex justify-between mt-[15px] px-2">
                    <p className="text-[17px] text-center pt-[5px]">
                      {product.name}
                    </p>
                    <p className="text-[17px] text-center font-bold pt-[5px]">
                      {product.price} đ
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="my-[50px] flex justify-between items-center">
          <p className="text-[28px]  text-[#f2611c] px-[40px]">
            SẢN PHẨM BÁN CHẠY
          </p>
          <p className="text-[18px]  text-black px-[40px]">Xem tất cả</p>
        </div>
        <div className="grid grid-cols-5 px-[40px] gap-[10px] mt-[30px] ">
          {favouriteProducts.map((product: Product) => (
            <Link to={`detail/${product.id}`}>
              <div className="relative shadow-lg rounded-lg transition duration-300">
                <div className="p-[5px]">
                  <div className="h-[245px] w-full overflow-hidden">
                    <img
                      src="https://picsum.photos/id/237/200/300"
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition ease-in-out duration-500 hover:opacity-100">
                    <div className="text-white text-2xl flex justify-center items-center gap-10">
                      <a
                        href="#"
                        className="hover:scale-125 transform transition ease-in-out duration-300 w-[40.14px] h-[34px] bg-white flex justify-center items-center rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5 text-[#f2611c]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="hover:scale-125 transform transition ease-in-out duration-300 w-[40.14px] h-[34px] bg-[#f2611c] flex justify-center items-center rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="hover:scale-125 transform transition ease-in-out duration-300 w-[40.14px] h-[34px] bg-white flex justify-center items-center rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5 text-[#f2611c]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="rounded-[8px] w-full text-[17px] text-[#b4b4b4] text-center mx-auto mt-3">
                    {product.category.name}
                  </div>
                  <div className="flex justify-between mt-[15px] px-2">
                    <p className="text-[17px] text-center pt-[5px]">
                      {product.name}
                    </p>
                    <p className="text-[17px] text-center font-bold pt-[5px]">
                      {product.price} đ
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="my-[50px] flex justify-between items-center">
          <p className="text-[28px]  text-[#f2611c] px-[40px]">
            SẢN PHẨM CỦA CHÚNG TÔI
          </p>
          <p className="text-[18px]  text-black px-[40px]">Xem tất cả</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
