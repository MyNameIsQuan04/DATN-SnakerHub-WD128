import { useEffect, useState } from "react";
import { useDistricts, useProvinces, useWards } from "../../apis/locations.ts";
import axios from "axios";
import { CartItem } from "../../interfaces/Cart.ts";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";

const Checkout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPayment] = useState<number>(1);
  const [selectedProvince, setSelectedProvince] = useState<{
    code: number;
    name: string;
  } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{
    code: number;
    name: string;
  } | null>(null);
  const [selectedWard, setSelectedWard] = useState<{
    code: number;
    name: string;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  const provinces = useProvinces();
  const [shippingFee, setShippingFee] = useState(0);
  const districts = useDistricts(selectedProvince?.code);
  const wards = useWards(selectedDistrict?.code);
  const token = localStorage.getItem("access_token");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchCheckoutItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.cart?.cart__items) {
        const items = response.data.cart.cart__items.filter((item: CartItem) =>
          selectedItems.includes(item.id)
        );
        setCheckoutItems(items);
        setCartItems(items);
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm thanh toán:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckoutItems();
  }, [selectedItems, token]);

  // Mã giảm giá
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number>(0);
  const [codeDiscount, setCodeDiscount] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const handleApplyVoucher = async () => {
    if (!codeDiscount) {
      toast.error("Vui lòng nhập mã giảm giá!");
      return;
    }
    const total_price = checkoutItems.reduce(
      (sum, item) => sum + item.product_variant.price * item.quantity,
      0
    );
    try {
      const response = await axios.post(
        "http://localhost:8000/api/apply-voucher",
        { codeDiscount, total_price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.discount) {
        setDiscount(response.data.discount);
        toast.success(
          `Áp dụng mã giảm giá ${codeDiscount} thành công! Giảm ${response.data.discount}đ`
        );
        setTotalAfterDiscount(response.data.total_after_discount);
      } else {
        setDiscount(0);
        toast.error(
          `Mã giảm giá ${codeDiscount} không hợp lệ hoặc đã hết hạn!`
        );
      }
    } catch (error) {
      toast.error("Không thể áp dụng mã giảm giá!");
    }
  };

  const totalPriceItem = (price: number, quantity: number) => price * quantity;
  const grandTotalPrice = checkoutItems.reduce(
    (total, item) => total + item.product_variant.price * item.quantity,
    0
  );
  const handlePaymentChange = (event: any) => {
    console.log(event.target.value);
    setPayment(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const apiUrl =
      paymentMethod == 1
        ? "http://localhost:8000/api/client/orders"
        : "http://localhost:8000/api/vnpay-payment";

    const orderData = {
      ...data,

      province: selectedProvince?.name,
      district: selectedDistrict?.name,
      town: selectedWard?.name,
      items: cartItems.map((item) => ({
        item_id: item.id,
        product__variant_id: item.product_variant.id,
        quantity: item.quantity,
        price: item.product_variant.price,
        total: totalPriceItem(item.product_variant.price, item.quantity),
      })),
      total_price: grandTotalPrice,
      codeDiscount,
      discount,
      shippingFee,
      paymentMethod,
    };

    // Xác định URL API dựa trên payment method
    setIsSubmitting(true);
    try {
      const response = await axios.post(apiUrl, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (paymentMethod === 1) {
        if (response.data.success) {
          toast.success("Đặt hàng thành công!");
          navigate("/thankyou");
        }
      } else {
        const paymentUrl = response.data;
        window.location.href = paymentUrl;
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt hàng.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatCurrency = (value: any) => {
    return value.toLocaleString("vi-VN") + "₫";
  };

  return (
    <div className="mt-[100px] px-[150px]">
      <div className="flex items-center space-x-2 mb-4 ">
        <a
          href="/cart"
          className="text-xl font-medium text-gray-800 hover:text-blue-400 hover:underline"
        >
          Giỏ hàng
        </a>
        <GrNext className="text-xl text-gray-600" />
        <a href="">Thanh toán</a>
      </div>
      <div className=" px-10 flex gap-10">
        {/* Phần bên trái: Danh sách sản phẩm */}
        <div className="w-3/5">
          <div className="space-y-6">
            {checkoutItems.map((item) => {
              const productVariant = item.product_variant;
              const product = productVariant.product;
              return (
                <div
                  key={item.id}
                  className="flex items-center border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-lg hover:border-gray-400 transition-all duration-300"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-20 h-20 rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-600">
                      Màu: {productVariant.color.name}, Kích cỡ:{" "}
                      {productVariant.size.name}
                    </p>
                  </div>
                  <p className="w-24 text-center">
                    {formatCurrency(productVariant.price)}
                  </p>
                  <div className="w-16 text-center">{item.quantity}</div>
                  <p className="w-24 text-center text-red-500">
                    {formatCurrency(
                      totalPriceItem(productVariant.price, item.quantity)
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phần bên phải: Tổng kết đơn hàng và thông tin địa chỉ */}
        <div className="w-2/5 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Đơn giá:</span>
              <span className="text-lg font-semibold text-red-500">
                {formatCurrency(grandTotalPrice)}
              </span>
            </div>
            {discount > 0 && (
              <div className="voucher-card flex justify-between items-center p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md">
                <div>
                  <p className="text-yellow-700 font-semibold text-sm">
                    Mã giảm giá đã áp dụng:
                  </p>
                  <p className="text-yellow-800 font-bold text-lg">
                    {codeDiscount}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-yellow-800 font-semibold text-lg">
                    {discount.toLocaleString()}đ
                  </p>
                  <button
                    onClick={() => {
                      setDiscount(0); // Đặt lại discount về 0
                      setCodeDiscount(""); // Xóa mã giảm giá
                      toast.info("Mã giảm giá đã được xóa."); // Hiển thị thông báo xóa
                    }}
                    className="text-red-500 hover:text-red-600 font-semibold hover:underline"
                  >
                    Xóa mã
                  </button>
                </div>
              </div>
            )}

            <div className="voucher-input flex justify-between items-center mt-4">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                value={codeDiscount}
                onChange={(e) => setCodeDiscount(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
              />
              <button
                onClick={handleApplyVoucher}
                className="ml-4 bg-yellow-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Áp dụng
              </button>
            </div>

            <hr className="my-4" />

            {/* Thông tin địa chỉ */}
            <div className="space-y-4 mt-4">
              <h3 className="font-semibold text-lg">Thông tin nhận hàng</h3>
              <div className="mt-[20px] flex gap-4">
                {/* Họ tên */}
                <div className="w-full sm:w-1/2">
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Họ tên"
                    className="w-full h-[40px] border border-[#c9c9c9] pl-[20px] rounded-md"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      Trường này là bắt buộc
                    </span>
                  )}
                </div>

                {/* Số điện thoại */}
                <div className="w-full sm:w-1/2">
                  <input
                    type="text"
                    {...register("phone", { required: true })}
                    placeholder="Số điện thoại"
                    className="w-full h-[40px] border border-[#c9c9c9] pl-[20px] rounded-md"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      Trường này là bắt buộc
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                {/* Tỉnh/Thành phố */}
                <div className="space-y-4">
                  {/* Tỉnh/Thành phố */}
                  <div className="w-full">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tỉnh/Thành phố
                    </label>
                    <select
                      id="province"
                      value={selectedProvince?.code || ""}
                      onChange={(e) => {
                        const selectedProvince = provinces.find(
                          (province) => province.code === +e.target.value
                        );
                        setSelectedProvince(selectedProvince || null);
                        if (selectedProvince?.name === "Thành phố Hà Nội") {
                          setShippingFee(30000);
                        } else {
                          setShippingFee(40000);
                        }
                      }}
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Tỉnh/thành phố</option>
                      {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Huyện/Quận */}
                  <div className="w-full">
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Huyện/Quận
                    </label>
                    <select
                      id="district"
                      value={selectedDistrict?.code || ""}
                      onChange={(e) => {
                        const selectedDistrict = districts.find(
                          (district) => district.code === +e.target.value
                        );
                        setSelectedDistrict(selectedDistrict || null);
                      }}
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Huyện/quận</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Xã/Phường */}
                  <div className="w-full">
                    <label
                      htmlFor="ward"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Xã/Phường
                    </label>
                    <select
                      id="ward"
                      value={selectedWard?.code || ""}
                      onChange={(e) => {
                        const selectedWard = wards.find(
                          (ward) => ward.code === +e.target.value
                        );
                        setSelectedWard(selectedWard || null);
                      }}
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Xã/phường</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Địa chỉ cụ thể */}
                <div className="space-y-2 mt-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ cụ thể
                  </label>
                  <textarea
                    id="address"
                    placeholder="Nhập địa chỉ cụ thể"
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    {...register("address", {
                      required: "Địa chỉ không được để trống",
                    })}
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      Không được để trống
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Hiển thị tổng tiền */}
            <hr className="my-4" />
            <div>
              <div className="flex justify-between">
                <span>Tổng tiền:</span>
                <span className="text-red-500">
                  {formatCurrency(grandTotalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-red-500">
                  +{formatCurrency(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Voucher:</span>
                <span className="text-red-500">
                  -{formatCurrency(discount)}
                </span>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-end text-lg">
              <span>Thành tiền: </span>
              <span className="text-red-500">
                {formatCurrency(grandTotalPrice - discount + shippingFee)}
              </span>
            </div>
            <div className="">
              <div className="w-full max-w-md mx-auto mt-4">
                <p className="text-lg font-semibold mb-2">
                  Phương thức thanh toán
                </p>
                <div className="relative">
                  <select
                    value={paymentMethod}
                    onChange={handlePaymentChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <option value={1}>Thanh toán khi nhận hàng</option>
                    <option value={2}>Thanh toán VNPay</option>
                    <option value={3}>Thanh toán MoMo</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Nút thanh toán */}
            <button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
            >
              {isSubmitting ? "Đang xử lý..." : "Thanh toán"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer className={`mt-20`} />
    </div>
  );
};

export default Checkout;
