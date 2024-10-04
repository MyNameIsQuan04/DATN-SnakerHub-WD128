import { useState } from "react";
import { useDistricts, useProvinces, useWards } from "../../apis/locations.ts";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const provinces = useProvinces();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const districts = useDistricts(selectedProvince);
  const wards = useWards(selectedDistrict);

  return (
    <div className="mt-[400px] px-[150px]">
      <div className="flex">
        <p className="text-[14px]">TRANG CHU</p>
        <p className="text-[14px] px-[4px]"> | </p>
        <p className="text-[14px]">GIO HANG</p>
      </div>

      <div className="border border-[#f3f3f3] mt-[30px]">
        <div className="flex *:text-[14px] *:text-center px-[10px] *:text-[#888888] my-[10px]">
          <p className="w-[550px]">SAN PHAM</p>
          <p className="w-[178px]">DON GIA</p>
          <p className="w-[177px]">SO LUONG</p>
          <p className="w-[150px]">SO TIEN</p>
          <p className="w-[146px]">THAO TAC</p>
        </div>
      </div>
      <div className="border border-[#c9c9c9] px-[10px] mt-[20px] *:text-[14px] ">
        <div className="flex my-[20px]">
          <div className="w-[550px]">
            <div className="flex justify-center items-center gap-[30px] ">
              <img
                src="https://picsum.photos/200/300"
                alt=""
                className="w-[100px] h-[100px]"
              />
              <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[170px]">
                Giày thể thao nữ MWC - 0623 Giày Sục Thể Thao Nữ Phối Họa Tiết
                Siêu Cute,Sneaker Êm Chân Đế Bằng Hot Tren
              </p>
              <p className="text-[#0000008A]">Mau: Den, Kich co: 37</p>
            </div>
          </div>
          <div className="w-[178px]">
            <div className="flex justify-center items-center gap-[10px] h-[100px]">
              <span className="line-through">250.000d</span>
              <span className="">149.000d</span>
            </div>
          </div>
          <div className="w-[177px]">
            <div className="flex justify-center items-center h-[100px]">
              <div className="flex items-center justify-center mx-auto w-[114px] h-[32px]  border border-[#c9c9c9]">
                <button
                  onClick={handleDecrease}
                  className="h-[32px] w-[32px] border-r "
                >
                  -
                </button>
                <span className="mx-[21px] text-[16px]">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="h-[32px] w-[32px] border-l  "
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="w-[150px] flex justify-center items-center">
            <span className="text-red-500">298.000d</span>
          </div>
          <div className="w-[146px] flex justify-center items-center">
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
        <hr className="mb-[10px]" />
      </div>
      <div className="mt-[20px] *:text-[14px]">
        <hr />
        <div className="flex">
          <div className="w-1/2"></div>
          <div className="w-1/2">
            <div className="flex justify-between mt-[5px]">
              <span>Tổng tiền hàng</span>
              <span>298.000 đ</span>
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
              <span className="text-red-500">298.000 đ</span>
            </div>
          </div>
        </div>
        <div className="mt-[10px]">
          <p className="font-semibold text-red-500">THÔNG TIN VẬN CHUYỂN</p>
          <div className="mt-[20px]">
            <input
              type="text"
              placeholder="Ho ten"
              className="w-[400px] h-[40px] border border-[#c9c9c9] pl-[20px]"
            />
            <input
              type="text"
              placeholder="SDT"
              className="w-[400px] h-[40px] border border-[#c9c9c9] pl-[20px] ml-[20px]"
            />
          </div>
          <textarea
            name=""
            id=""
            placeholder="Dia chi nhan hang"
            className="h-[100px] pl-[20px] pt-[20px] w-full border border-[#c9c9c9] mt-[20px]"
          ></textarea>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
