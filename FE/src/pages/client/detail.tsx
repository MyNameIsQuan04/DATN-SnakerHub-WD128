import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlineBank } from "react-icons/ai";
import { Product } from "../../interfaces/Product";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Detail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<
    number | null
  >(null);
  const token = localStorage.getItem("access_token");

  // Hàm lấy thông tin sản phẩm
  const fetchProduct = async (productId: string) => {
    try {
      const response = await axios.get<Product>(
        `http://localhost:8000/api/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);
  console.log(product);
  // Chọn màu sắc
  const handleSelectColor = (colorId: number) => {
    setSelectedColor(colorId);
    filterSizesByColor(colorId);
    setSelectedSize(null);
    setSelectedVariantPrice(null);
  };

  // Chọn kích thước
  const handleSelectSize = (sizeId: number) => {
    setSelectedSize(sizeId);
    if (selectedColor !== null && product) {
      const selectedVariant = product.product_variants.find(
        (variant) =>
          variant.color.id === selectedColor && variant.size.id === sizeId
      );

      if (selectedVariant) {
        setSelectedVariantPrice(selectedVariant.price);
      }
    }
  };

  // Lọc các kích thước có sẵn dựa trên màu sắc
  const filterSizesByColor = (colorId: number) => {
    if (product) {
      const sizesForColor = product.product_variants
        .filter((variant) => variant.color.id === colorId)
        .map((variant) => variant.size.id);

      setAvailableSizes(sizesForColor);
    }
  };

  // Thêm vào giỏ hàng
  const addToCart = async (
    product: Product,
    selectedColor: unknown,
    selectedSize: unknown
  ) => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng!");
      return;
    }

    if (!product) return;

    const selectedVariant = product.product_variants.find(
      (variant) =>
        variant.color.id === selectedColor && variant.size.id === selectedSize
    );

    if (!selectedVariant) {
      alert(
        "Không tìm thấy biến thể sản phẩm tương ứng. Vui lòng kiểm tra lại sản phẩm!"
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/add", {
        token: token,
        name: product.name,
        id: product.id,
        color_id: selectedColor,
        size_id: selectedSize,
        quantity: 1,
      });
      if (!token) {
        alert("Ban hay dang nhap de them gio hang");
      }
      console.log(response.data);

      toast.success("Thêm sản thành công sản phẩm!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  if (!product) {
    return <div>Đang tải...</div>;
  }

  const colors = Array.from(
    new Set(product.product_variants.map((variant) => variant.color.id))
  ).map(
    (colorId) =>
      product.product_variants.find((variant) => variant.color.id === colorId)
        ?.color
  );

  const sizes = Array.from(
    new Set(product.product_variants.map((variant) => variant.size.id))
  ).map(
    (sizeId) =>
      product.product_variants.find((variant) => variant.size.id === sizeId)
        ?.size
  );

  return (
    <div className="">
      {/* Thông tin sản phẩm */}
      <div className="container mx-auto mt-10">
        <div className="flex gap-5 px-5">
          <div className="w-1/2">
            {/* Hình ảnh chính của sản phẩm */}
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full rounded-md"
            />

            {/* Hình ảnh thu nhỏ */}
            <div className="flex mt-2 space-x-2">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  src={product.thumbnail}
                  className="w-1/5 h-auto cursor-pointer rounded-md hover:opacity-80"
                  alt=""
                />
              ))}
            </div>
          </div>

          <div className="w-1/2">
            <p className="text-3xl font-bold text-gray-800">{product.name}</p>

            <div className="flex mt-4 items-center">
              <div className="flex text-yellow-400 text-lg mr-5">
                <span>⭐</span> <span>⭐</span> <span>⭐</span> <span>⭐</span>
                <span>⭐</span>
              </div>
              <div className="flex gap-3 text-sm text-gray-500">
                <span>1401 đánh giá</span>
                <span>890 lượt thích</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="line-through text-gray-400 text-xl">
                230.000đ
              </span>
              <span className="text-red-600 text-3xl font-semibold">
                {selectedVariantPrice
                  ? selectedVariantPrice.toLocaleString("vi-VN")
                  : product.price.toLocaleString("vi-VN")}{" "}
                VND
              </span>
            </div>

            <div className="text-red-600 text-sm mt-2 font-semibold">
              FLASH SALE
            </div>
            <p className="text-sm mt-4 font-semibold">SALE THỂ THAO 149K</p>

            <div className="flex mt-6 items-center">
              <p className="text-sm font-semibold mr-8">MÀU SẮC:</p>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <p
                    key={color?.id}
                    onClick={() => handleSelectColor(color!.id as number)}
                    className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white ${
                      selectedColor === color!.id ? "border-red-500" : ""
                    }`}
                  >
                    {color?.name}
                  </p>
                ))}
              </div>
            </div>

            {/* Màu sắc */}
            <div className="flex mt-6 items-center">
              <p className="text-sm font-semibold mr-8">KÍCH THƯỚC:</p>
              <div className="flex gap-4">
                {sizes.map((size) => (
                  <p
                    key={size?.id}
                    onClick={() => {
                      if (availableSizes.includes(size!.id)) {
                        handleSelectSize(size!.id);
                      }
                    }}
                    className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-md ${
                      availableSizes.includes(size!.id)
                        ? "hover:bg-red-500 hover:text-white"
                        : "bg-gray-200 cursor-not-allowed text-gray-500"
                    } ${selectedSize === size!.id ? "border-red-500" : ""}`}
                  >
                    {size?.name}
                  </p>
                ))}
              </div>
            </div>

            <p className="text-sm mt-6 cursor-pointer text-blue-500 hover:underline">
              HƯỚNG DẪN TÌM SIZE
            </p>

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
                <span className="text-red-600 text-sm">TÌM TẠI CỬA HÀNG</span>
              </div>
            </div>

            <div className="flex gap-4 mt-5">
              <button className="bg-red-500 text-white px-6 py-2 text-sm rounded-md shadow-md hover:bg-red-600 transition">
                MUA NGAY
              </button>
              <button
                onClick={() => addToCart(product, selectedColor, selectedSize)}
                className="border border-red-500 text-red-500 px-6 py-2 text-sm rounded-md shadow-md hover:bg-red-50 transition"
              >
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>

            {/* Các dịch vụ liên quan */}
            <div className="grid grid-cols-3 mt-6 gap-4">
              <div className="flex flex-col items-center text-sm text-gray-600">
                <MdOutlineLocalShipping className="w-[30px] h-auto" />
                <p>Bảo hành keo vĩnh viễn</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <MdOutlineLocalShipping className="w-[30px] h-auto" />
                <p>Miễn phí vận chuyển toàn quốc cho đơn hàng từ 150k</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <TbTruckReturn className="w-[30px] h-auto" />
                <p>Đổi trả dễ dàng (trong vòng 7 ngày nếu lỗi nhà sản xuất)</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <FaPhoneVolume className="w-[30px] h-auto" />
                <p>Hotline 1900.633.349 hỗ trợ từ 8h30-21h30</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <AiOutlineBank className="w-[30px] h-auto" />
                <p>Giao hàng tận nơi, nhận hàng xong thanh toán</p>
              </div>
              <div className="flex flex-col items-center text-sm text-gray-600">
                <GrAnnounce className="w-[30px] h-auto" />
                <p>Ưu đãi tích điểm và hưởng quyền lợi thành viên từ MWC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Detail;
