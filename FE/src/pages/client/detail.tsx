import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../interfaces/Order";
import { useParams } from "react-router-dom";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlineBank } from "react-icons/ai";

const Detail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  const fetchProduct = async (productId: string) => {
    try {
      const response = await axios.get<Product>(
        `http://localhost:8000/api/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[90px]">
      {/* Product details */}
      <div className="container mx-auto mt-10">
        <div className="flex gap-5 px-5">
          <div className="w-1/2">
            {/* Main Product Image */}
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full rounded-md"
            />

            {/* Thumbnail Images */}
            <div className="flex mt-2 space-x-2">
              <img
                src={product.thumbnail}
                className="w-1/5 h-auto cursor-pointer rounded-md hover:opacity-80"
                alt=""
              />
              <img
                src={product.thumbnail}
                className="w-1/5 h-auto cursor-pointer rounded-md hover:opacity-80"
                alt=""
              />
              <img
                src={product.thumbnail}
                className="w-1/5 h-auto cursor-pointer rounded-md hover:opacity-80"
                alt=""
              />
              <img
                src={product.thumbnail}
                className="w-1/5 h-auto cursor-pointer rounded-md hover:opacity-80"
                alt=""
              />
            </div>
          </div>
          <div className="w-1/2">
            {/* Product Name */}
            <p className="text-3xl font-bold text-gray-800">{product.name}</p>

            {/* Rating and Likes */}
            <div className="flex mt-4 items-center">
              <div className="flex text-yellow-400 text-lg mr-5">
                <span>⭐</span> <span>⭐</span> <span>⭐</span> <span>⭐</span>
              </div>
              <div className="flex gap-3 text-sm text-gray-500">
                <span>1401 đánh giá</span>
                <span>890 lượt thích</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="line-through text-gray-400 text-xl">
                230.000đ
              </span>
              <span className="text-red-600 text-3xl font-semibold">
                {product.price.toLocaleString("vi-VN")} VND
              </span>
            </div>

            {/* Flash Sale Label */}
            <div className="text-red-600 text-sm mt-2 font-semibold">
              FLASH SALE
            </div>
            <p className="text-sm mt-4 font-semibold">SALE THỂ THAO 149K</p>

            {/* Color Variants */}
            <div className="flex mt-6 items-center">
              <p className="text-sm font-semibold mr-8">KÍCH THƯỚC:</p>
              <div className="flex gap-4">
                {product.product_variants.map((variant) => (
                  <p
                    key={variant.id}
                    className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white"
                  >
                    {variant.color.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Size Variants */}
            <div className="flex mt-6 items-center">
              <p className="text-sm font-semibold mr-8">KÍCH THƯỚC:</p>
              <div className="flex gap-4">
                {product.product_variants.map((variant) => (
                  <p
                    key={variant.id}
                    className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white"
                  >
                    {variant.size.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Size Guide Link */}
            <p className="text-sm mt-6 cursor-pointer text-blue-500 hover:underline">
              HƯỚNG DẪN TÌM SIZE
            </p>

            {/* Showroom Search */}
            <div className="border-2 mt-6 border-red-500 w-full h-12 flex justify-center items-center cursor-pointer">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="red"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span className="text-red-600 text-sm">
                  TÌM SẢN PHẨM TẠI SHOWROOM
                </span>
              </div>
            </div>

            {/* Purchase Buttons */}
            <div className="flex gap-4 mt-5">
              <button className="bg-red-500 text-white px-6 py-2 text-sm rounded-md shadow-md hover:bg-red-600 transition">
                MUA NGAY
              </button>
              <button className="border border-red-500 text-red-500 px-6 py-2 text-sm rounded-md shadow-md hover:bg-red-50 transition">
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>

            {/* Promotions */}
            <div className="bg-gray-100 py-3 px-4 mt-4 text-sm font-semibold">
              KHUYẾN MÃI
            </div>
            <div className="border border-gray-200 p-4 flex items-center">
              <span className="bg-blue-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
                1
              </span>
              <span className="ml-3">THỂ THAO ĐỒNG GIÁ 149K</span>
              <span className="text-blue-500 ml-3 cursor-pointer">
                (click để xem chi tiết)
              </span>
            </div>

            {/* Warranty */}
            <div className="grid grid-cols-3 mt-6 gap-4">
              <div className="flex flex-col items-center text-sm text-gray-600">
                <MdOutlineLocalShipping className="w-[30px] h-auto" />
                <p>Bảo hành keo vĩnh viễn</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <MdOutlineLocalShipping className="w-[30px] h-auto" />
                <p>Miễn phí vận chuyển toàn quốc
                cho đơn hàng từ 150k</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <TbTruckReturn className="w-[30px] h-auto" />
                <p>Đổi trả dễ dàng
                (trong vòng 7 ngày nếu lỗi nhà sản xuất)</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <FaPhoneVolume className="w-[30px] h-auto" />
                <p>Hotline 1900.633.349
                hỗ trợ từ 8h30-21h30</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <AiOutlineBank className="w-[30px] h-auto" />
                <p>Giao hàng tận nơi,
                nhận hàng xong thanh toán</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <GrAnnounce className="w-[30px] h-auto" />
                <p>Ưu đãi tích điểm và
                hưởng quyền lợi thành viên từ MWC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
