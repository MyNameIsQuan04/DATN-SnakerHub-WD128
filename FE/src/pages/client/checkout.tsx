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
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const provinces = useProvinces();
  const districts = useDistricts(selectedProvince);
  const wards = useWards(selectedDistrict);
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
  const totalPriceItem = (price: number, quantity: number) => price * quantity;
  const grandTotalPrice = checkoutItems.reduce(
    (total, item) => total + item.product_variant.price * item.quantity,
    0
  );

  const onSubmit = async (data: any) => {
    console.log(cartItems);
    const orderData = {
      ...data,
      province: selectedProvince,
      district: selectedDistrict,
      town: selectedWard,
      items: cartItems.map((item) => ({
        product__variant_id: item.product_variant.id,
        quantity: item.quantity,
        price: item.product_variant.price,
        total: totalPriceItem(item.product_variant.price, item.quantity),
      })),
      total_price: grandTotalPrice,
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
    <div className="mt-[400px] px-[150px]">
      <div className="flex">
        <p className="text-[14px]">TRANG CHU</p>
        <p className="text-[14px] px-[4px]"> | </p>
        <p className="text-[14px]">GIO HANG</p>
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
        {checkoutItems.map((item, index) => {
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
            <div className="flex justify-between mt-[5px]">
              <span>Tổng tiền hàng</span>
              <span>{grandTotalPrice} đ</span>
            </div>
            <div className="flex justify-between mt-[5px]">
              <span>Giảm giá sản phẩm</span>
              <span>000 đ</span>
            </div>
            <div className="flex justify-between mt-[5px]">
              <span>Giảm giá coupon</span>
              <span>000 đ</span>
            </div>
            <div className="flex justify-between mt-[5px]">
              <span>Phí vận chuyển</span>
              <span>000 đ</span>
            </div>
            <hr />
            <div className="flex justify-between mt-[10px]">
              <span>TỔNG</span>
              <span className="text-red-500">{grandTotalPrice} đ</span>
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
          </div>
          <textarea
            {...register("address", { required: true })}
            placeholder="Địa chỉ nhận hàng"
            className="h-[100px] pl-[20px] pt-[20px] w-full border border-[#c9c9c9] mt-[20px]"
          ></textarea>
          {errors.address && (
            <span className="text-red-500">Trường này là bắt buộc</span>
          )}
          {/* <div>
            <h3>Chọn phương thức thanh toán:</h3>
            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  {...register("paymentMethod", { required: true })}
                  value="vnpay"
                />
                Thanh toán VNPay
              </label>
              <label>
                <input
                  type="radio"
                  {...register("paymentMethod", { required: true })}
                  value="momo"
                />
                Thanh toán Momo
              </label>
              <label>
                <input
                  type="radio"
                  {...register("paymentMethod", { required: true })}
                  value="cash"
                />
                Thanh toán tiền mặt
              </label>
            </div>
            {errors.paymentMethod && (
              <span className="text-red-500">Trường này là bắt buộc</span>
            )}
          </div> */}
          <div className="mt-[20px]">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="province" className="font-semibold">
                  Tỉnh/Thành phố:
                </label>
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setSelectedDistrict("");
                    setSelectedWard("");
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
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedWard("");
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
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
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
              <ToastContainer />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
