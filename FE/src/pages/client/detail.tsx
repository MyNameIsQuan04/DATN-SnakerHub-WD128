import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlineBank } from "react-icons/ai";
import { Product } from "../../interfaces/Product";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { GrNext } from "react-icons/gr";
import Slider from "react-slick";

const Detail = () => {
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

  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);

  const openSizeGuideModal = () => setIsSizeGuideModalOpen(true);
  const closeSizeGuideModal = () => setIsSizeGuideModalOpen(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(true);

  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<
    number | null
  >(null);
  const token = localStorage.getItem("access_token");
  const [activeTab, setActiveTab] = useState(0);
  const [quantity, setQuantity] = useState(1); // Bắt đầu với số lượng 1

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1); // Tăng số lượng
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1); // Giảm số lượng, không cho về dưới 1
    }
  };
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setQuantity(value === "" ? 1 : parseInt(value, 10));
    }
    if (value > stock) {
      alert("Vượt quá số lượng sản phẩm");
      setQuantity(stock);
      return;
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Số sản phẩm hiển thị trên một slide
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
  // Hàm lấy thông tin sản phẩm
  const fetchProduct = async (productId: string) => {
    try {
      const response = await axios.get<Product>(
        `http://localhost:8000/api/client/products/${productId}`
      );

      setProduct(response.data.product);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    }
  };
  // const fetchRelatedProducts = async (
  //   categoryId: number,
  //   currentProductId: number
  // ) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/api/products/category/${categoryId}`
  //     );
  //     const products = response.data.products;
  //     console.log(products);
  //     const relatedProducts = products.filter(
  //       (product: Product) => product.id !== Number(currentProductId)
  //     );
  //     setRelatedProducts(relatedProducts);
  //     console.log(relatedProducts);
  //   } catch (error) {
  //     console.error("Lỗi khi lấy sản phẩm liên quan:", error);
  //   }
  // };
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

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
    if (!token) {
      toast.error("Hãy đăng nhập để sử dụng chức năng!");
    }
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
        quantity: quantity,
      });

      console.log(response.data);

      toast.success("Thêm sản thành công sản phẩm!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  useEffect(() => {
    let slideshowInterval: NodeJS.Timeout;
    let resetSlideshowTimeout: NodeJS.Timeout;

    if (isSlideshowActive && product?.product_variants.length) {
      slideshowInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === product.product_variants.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      resetSlideshowTimeout = setTimeout(() => {
        setIsSlideshowActive(true);
      }, 2000);
    }

    return () => {
      clearInterval(slideshowInterval);
      clearTimeout(resetSlideshowTimeout);
    };
  }, [isSlideshowActive, product]);

  const handleImageClick = (index: number) => {
    setIsSlideshowActive(false);
    setCurrentImageIndex(index);

    setTimeout(() => {
      setIsSlideshowActive(true);
    }, 2000);
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
  const selectedVariant = product.product_variants.find(
    (variant) =>
      variant.color_id === selectedColor && variant.size_id === selectedSize
  );

  const stock = selectedVariant ? selectedVariant.stock : 0;
  const isOutOfStock = product.product_variants.every(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (variant: any) => variant.stock === 0
  );
  return (
    <div className="mt-[80px]">
      {/* Thông tin sản phẩm */}
      <div className="container mx-auto mt-[20px] px-16">
        <div className="flex items-center space-x-2 mb-4">
          <a
            href="/"
            className="text-xl font-medium text-gray-800 hover:text-blue-400 hover:underline"
          >
            Home
          </a>
          <GrNext className="text-xl text-gray-600" />
        </div>

        <div className="flex gap-5 px-5">
          <div className="w-1/2 relative">
            {/* Ảnh chính */}
            <img
              key={currentImageIndex} // Cập nhật key để React nhận diện khi thay đổi ảnh
              src={product.product_variants[currentImageIndex].image}
              alt={`Thumbnail ${currentImageIndex + 1}`}
              className="w-full h-[550px] object-cover rounded-md transition-opacity duration-500 ease-in-out"
            />
            <button
              onClick={() =>
                setCurrentImageIndex((prevIndex) =>
                  prevIndex === 0
                    ? product.product_variants.length - 1
                    : prevIndex - 1
                )
              }
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            >
              ❮
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((prevIndex) =>
                  prevIndex === product.product_variants.length - 1
                    ? 0
                    : prevIndex + 1
                )
              }
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            >
              ❯
            </button>

            {/* Ảnh nhỏ bên dưới */}
            <div className="flex mt-4 space-x-2 justify-center">
              {product.product_variants.map((variant, index) => (
                <img
                  key={index}
                  src={variant.image}
                  alt={`Variant ${index + 1}`}
                  className={`w-[100px] h-[100px] object-cover cursor-pointer rounded-md hover:opacity-80 transition-all duration-300 ${
                    currentImageIndex === index
                      ? "border-2 border-orange-500"
                      : "border"
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>

          <div className="w-1/2">
            <p className="text-3xl font-bold uppercase text-gray-800">
              {product.name}
            </p>

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
              <span className="text-red-600 text-3xl font-semibold">
                {selectedVariantPrice
                  ? selectedVariantPrice.toLocaleString("vi-VN")
                  : product.price.toLocaleString("vi-VN")}{" "}
                VND
              </span>
            </div>

            <div className="text-red-300 text-sm mt-2 font-semibold uppercase">
              {product.category.name}
            </div>
            <p className="text-sm mt-4 font-semibold">
              {product.short_description}
            </p>

            <div className="flex mt-6 items-center">
              <p className="text-sm font-semibold mr-8">MÀU SẮC:</p>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <p
                    key={color?.id}
                    onClick={() => handleSelectColor(color!.id as number)}
                    className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-md hover:bg-orange-500 hover:text-white ${
                      selectedColor === color!.id ? "border-orange-500" : ""
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
                        ? "hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out"
                        : "bg-gray-200 cursor-not-allowed text-gray-500"
                    } ${selectedSize === size!.id ? "border-orange-500" : ""}`}
                  >
                    {size?.name}
                  </p>
                ))}
              </div>
            </div>

            <p
              className="text-sm mt-6 cursor-pointer text-blue-500 hover:underline"
              onClick={openSizeGuideModal}
            >
              HƯỚNG DẪN TÌM SIZE
            </p>
            <p className="mt-[20px] gap-[15px] cursor-pointer flex text-black text-sm font-semibold uppercase">
              Số lượng còn lại:
              {stock > 0 ? stock : " ..."}
            </p>

            {isOutOfStock && (
              <p className="mt-4 text-red-500 text-sm font-semibold">
                Sản phẩm hiện đã hết hàng.
              </p>
            )}
            <div className="flex items-center gap-2 mt-[]">
              <button
                className="group rounded-full border border-gray-200 shadow-sm p-2 bg-white hover:bg-gray-50"
                onClick={handleDecrease}
              >
                <svg
                  className="stroke-gray-900"
                  width="14"
                  height="14"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 9.5H13.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-200 rounded-full w-8 aspect-square text-gray-900 text-xs py-1 text-center"
              />
              <button
                className="group rounded-full border border-gray-200 shadow-sm p-2 bg-white hover:bg-gray-50"
                onClick={handleIncrease}
                disabled={quantity >= stock}
              >
                <svg
                  className="stroke-gray-900"
                  width="14"
                  height="14"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 9.5H14.25M9 14.75V4.25"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {isSizeGuideModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={closeSizeGuideModal} // Đóng modal khi click vào nền
              >
                <div
                  className="bg-white rounded-lg shadow-lg p-6 relative w-3/4 max-w-md"
                  onClick={(e) => e.stopPropagation()} // Ngăn sự kiện đóng modal khi click bên trong modal
                >
                  <button
                    onClick={closeSizeGuideModal}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                  <img
                    src="https://file.hstatic.net/1000339709/article/bang_cach_do_size_giay_the_thao_7611f668_9ba6_4450_4314_8367b2adbe59_1024x1024_bfdab0bd0460498db6ddc828b0d4c09a.jpg" // Thay bằng đường dẫn ảnh thật
                    alt="Hướng dẫn tìm size"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-5">
              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product, selectedColor, selectedSize)}
                className={`border border-orange-500 text-orange-500 px-6 py-2 text-sm rounded-md shadow-md hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out transform ${
                  isOutOfStock
                    ? "cursor-not-allowed text-black border-orange-500"
                    : ""
                }`}
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
              {/* Thêm phần mô tả sản phẩm */}
              {/* <div className="mt-8 border-t-4 border-gray-300 pt-4">
                <p className="text-lg font-semibold text-gray-800">
                  MÔ TẢ SẢN PHẨM
                </p>
                <div className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>{product.description}</li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-10 border-t-2 border-gray-400">
        {/* Tab Buttons */}
        <div className="flex border-b bg-gray-200 border-gray-200 py-[10px] px-[80px] gap-[20px]">
          <button
            onClick={() => handleTabClick(0)}
            className={`px-4 py-2 font-semibold rounded-md focus:outline-none ${
              activeTab === 0 ? "bg-white" : "text-gray-600"
            }`}
          >
            Chi tiết sản phẩm
          </button>
          <button
            onClick={() => handleTabClick(1)}
            className={`px-4 py-2 font-semibold rounded-md focus:outline-none ${
              activeTab === 1 ? "bg-white" : "text-gray-600"
            }`}
          >
            Bình luận
          </button>
        </div>
        <hr className="border-t-2 border-gray-400" />

        <div className="px-[80px] py-[10px]">
          {activeTab === 0 && (
            <div className="">
              <div className="flex gap-[5px]">
                <p className="text-[15px] font-bold">Tên sản phẩm:</p>
                <p className="text-[15px]">{product.name}</p>
              </div>
              <div className="flex gap-[10px]">
                <p className="text-[15px] font-bold">Màu sắc:</p>
                {sizes.map((size) => (
                  <p
                    className="text-[15px]"
                    key={size?.id}
                    onClick={() => {
                      if (availableSizes.includes(size!.id)) {
                        handleSelectSize(size!.id);
                      }
                    }}
                  >
                    {size?.name}
                  </p>
                ))}
                <p className="text-[15px] font-bold">Kích thước: </p>
                {colors.map((color) => (
                  <p
                    className="text-[15px]"
                    key={color?.id}
                    onClick={() => handleSelectColor(color!.id as number)}
                  >
                    {color?.name}
                  </p>
                ))}
              </div>
              <div className="flex gap-[10px] items-center">
                <p className="text-[15px] font-bold">Mô tả: </p>
                <p className="text-[15px]">{product.description}</p>
              </div>
            </div>
          )}
          {activeTab === 1 && <div>Chưa có bình luận !</div>}
        </div>
      </div>
      <div className="">
        <p className="mt-5 mb-4 ml-[90px] font-semibold text-[30px]">
          Sản phẩm liên quan
        </p>
        <div className="px-[40px]">
          <Slider {...settings} className="custom-slider">
            {relatedProducts.map((product: Product) => (
              <div key={product.id} className="gap-[10px]">
                <Link to={`/detail/${product.id}`}>
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
      <ToastContainer className="mt-[80px]" />
    </div>
  );
};

export default Detail;
