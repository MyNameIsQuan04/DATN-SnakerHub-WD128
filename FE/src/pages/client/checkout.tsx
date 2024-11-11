import { useEffect, useState } from "react";
import { useDistricts, useProvinces, useWards } from "../../apis/locations.ts";
import axios from "axios";
import { CartItem } from "../../interfaces/Cart.ts";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
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
  const [loading, setLoading] = useState<boolean>(true);
  const provinces = useProvinces();
  const districts = useDistricts(selectedProvince?.code);
  const wards = useWards(selectedDistrict?.code);
  const token = localStorage.getItem("access_token");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchCheckoutItems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.data.success && response.data.cart?.cart__items) {
        const items = response.data.cart.cart__items.filter((item: CartItem) =>
          selectedItems.includes(item.id)
        );

        console.log(items);

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
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number>(0);
  const [codeDiscount, setCodeDiscount] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const handleApplyVoucher = async () => {
    if (!codeDiscount) {
      toast.error("Vui lòng nhập mã giảm giá!");
      return;
    }
    const total = checkoutItems.reduce(
      (sum, item) => sum + item.product_variant.price * item.quantity,
      0
    );
    try {
      const response = await axios.post(
        "http://localhost:8000/api/apply-voucher",
        { codeDiscount, total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kiểm tra nội dung phản hồi từ backend
      console.log("Phản hồi từ server:", response.data);

      if (response.data.discount) {
        setDiscount(response.data.discount);
        toast.success(
          `Áp dụng mã giảm giá ${codeDiscount} thành công! Giảm ${response.data.discount}đ`
        );
        setTotalAfterDiscount(response.data.total_after_discount);
      } else {
        setDiscount(0);
        console.error("Lỗi mã giảm giá:", response.data.errors);
        toast.error(
          `Mã giảm giá ${codeDiscount} không hợp lệ hoặc đã hết hạn!`
        );
      }
    } catch (error) {
      console.error("Lỗi khi áp dụng mã giảm giá:", error);
      toast.error("Không thể áp dụng mã giảm giá!");
    }
  };

  // Hết

  const totalPriceItem = (price: number, quantity: number) => price * quantity;
  const grandTotalPrice = checkoutItems.reduce(
    (total, item) => total + item.product_variant.price * item.quantity,
    0
  );

  const onSubmit = async (data: any) => {
    // console.log(cartItems);
    const orderData = {
      ...data,
      province: selectedProvince?.name,
      district: selectedDistrict?.name,
      town: selectedWard?.name,
      items: cartItems.map((item) => ({
        product__variant_id: item.product_variant.id,
        quantity: item.quantity,
        price: item.product_variant.price,
        total: totalPriceItem(item.product_variant.price, item.quantity),
      })),
      total_price: totalAfterDiscount,
      codeDiscount,
      discount,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/client/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Đặt hàng thành công!");
        navigate("/thankyou");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng.");
    }
  };

  return (
    <div className="mt-[30px] px-[150px]">
      <div className="flex">
        <p className="text-[14px]">Trang chủ</p>
        <p className="text-[14px] px-[4px]"> | </p>
        <p className="text-[14px]">Thanh Toán</p>
      </div>

      <div className="border border-[#f3f3f3] mt-[30px]">
        <div className="flex text-[14px] text-center px-[10px] text-[#888888] my-[10px]">
          <p className="w-[550px]">SẢN PHẨM</p>
          <p className="w-[178px]">ĐƠN GIÁ</p>
          <p className="w-[177px]">SỐ LƯỢNG</p>
          <p className="w-[150px]">SỐ TIỀN</p>
        </div>
      </div>
      <div className="border border-[#c9c9c9] px-[10px] mt-[20px] text-[14px] ">
        {checkoutItems.map((item) => {
          const productVariant = item.product_variant;
          const product = productVariant.product;
          return (
            <div>
              <div className="flex my-[20px]">
                <div className="w-[550px]">
                  <div className="flex justify-center items-center gap-[30px]">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-[100px] h-[100px]"
                    />
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[170px]">
                      {product.name}
                    </p>
                    <p className="text-[#0000008A]">
                      Màu {productVariant.color.name}, Kích cỡ:{" "}
                      {productVariant.size.name}
                    </p>
                  </div>
                </div>
                <div className="w-[178px]">
                  <div className="flex justify-center items-center gap-[10px] h-[100px]">
                    <span className="line-through">
                      {productVariant.price}đ
                    </span>
                    <span className="">{productVariant.price} đ</span>
                  </div>
                </div>
                <div className="w-[177px]">
                  <div className="flex justify-center items-center h-[100px]">
                    {item.quantity}
                  </div>
                </div>
                <div className="w-[150px] flex justify-center items-center">
                  <span className="text-red-500">
                    {productVariant.price * item.quantity} đ
                  </span>
                </div>
              </div>
              <hr className="mb-[10px]" />
            </div>
          );
        })}
      </div>
      <div className="mt-[20px] text-[14px]">
        <hr />
        <div className="flex">
          <div className="w-1/2"></div>
          <div className="w-1/2">
            <div className="flex justify-between my-[10px]">
              <span>Tổng tiền hàng</span>
              <span>{grandTotalPrice} đ</span>
            </div>

            <div className="flex justify-between mt-[5px]">
              <span>Phí vận chuyển</span>
              <span>000 đ</span>
            </div>
            <div className="my-[10px]">
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  value={codeDiscount}
                  onChange={(e) => setCodeDiscount(e.target.value)}
                  placeholder="Nhập mã giảm giá"
                  className="border h-[40px] w-[300px] pl-[10px]"
                />
                <button
                  type="button"
                  onClick={handleApplyVoucher}
                  className="bg-blue-500 text-white h-[40px] w-[150px] hover:bg-blue-600"
                >
                  Áp dụng
                </button>
              </div>
            </div>
            {discount > 0 && (
              <p className="text-green-500 mt-2">
                Mã giảm giá đã áp dụng: {discount}đ
              </p>
            )}
            <div className="flex justify-between my-[10px]">
              <span>Mã giảm giá giảm</span>
              <span>{discount}đ</span>
            </div>
            <hr />
            <div className="flex justify-between mt-[10px]">
              <span>TỔNG</span>
              <span className="text-red-500">
                {totalAfterDiscount || grandTotalPrice} đ
              </span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[10px]">
          <p className="font-semibold text-red-500">THÔNG TIN VẬN CHUYỂN</p>
          <div className="mt-[20px]">
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Họ tên"
              className="w-[400px] h-[40px] border border-[#c9c9c9] pl-[20px]"
            />
            {errors.name && (
              <span className="text-red-500">Trường này là bắt buộc</span>
            )}
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="Số điện thoại"
              className="w-[400px] h-[40px] border border-[#c9c9c9] pl-[20px] ml-[20px]"
            />
            {errors.phone && (
              <span className="text-red-500">Trường này là bắt buộc</span>
            )}
            <textarea
              {...register("address", { required: true })}
              placeholder="Địa chỉ nhận hàng"
              className="h-[100px] pl-[20px] pt-[20px] w-full border border-[#c9c9c9] mt-[20px]"
            ></textarea>
            {errors.address && (
              <span className="text-red-500">Trường này là bắt buộc</span>
            )}
          </div>
          <div className="mt-[20px]">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="province" className="font-semibold">
                  Tỉnh/Thành phố:
                </label>
                <select
                  id="province"
                  value={selectedProvince?.code || ""}
                  onChange={(e) => {
                    const province = provinces.find(
                      (p) => p.code === Number(e.target.value)
                    );
                    if (province) setSelectedProvince(province);
                  }}
                  className="border h-[40px] ml-[5px]"
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>

                {selectedProvince && (
                  <>
                    <label
                      htmlFor="district"
                      className="ml-[10px] font-semibold"
                    >
                      Quận/Huyện:
                    </label>
                    <select
                      id="district"
                      value={selectedDistrict?.code || ""}
                      onChange={(e) => {
                        const district = districts.find(
                          (d) => d.code === Number(e.target.value)
                        );
                        if (district) setSelectedDistrict(district);
                      }}
                      className="border h-[40px] ml-[5px]"
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {selectedDistrict && (
                  <>
                    <label htmlFor="ward" className="ml-[10px] font-semibold">
                      Xã/Phường:
                    </label>
                    <select
                      id="ward"
                      value={selectedWard?.code || ""}
                      onChange={(e) => {
                        const ward = wards.find(
                          (w) => w.code === Number(e.target.value)
                        );
                        if (ward) setSelectedWard(ward);
                      }}
                      className="border h-[40px] ml-[5px]"
                    >
                      <option value="">Chọn xã/phường</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>

              <button className="bg-red-500 text-white h-[40px] w-[200px] float-right hover:bg-red-600">
                ĐẶT HÀNG
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
