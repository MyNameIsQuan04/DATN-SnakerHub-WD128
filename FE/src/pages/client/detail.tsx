import { useState } from "react";

const Detail = () => {
  const colors = [
    { id: "zinc", colorCode: "bg-zinc-600" },
    { id: "slate", colorCode: "bg-slate-400" },
    { id: "red", colorCode: "bg-red-500" },
    { id: "blue", colorCode: "bg-blue-500" },
  ];
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  return (
    <div className="mt-[400px]">
      <div className="flex gap-[20px] px-[20px]">
        <div className="w-1/2">
          <div className="">
            <img
              src="https://picsum.photos/200/300"
              alt=""
              className="w-full "
            />
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-[20px]">
            Giày thể thao nữ MWC - 0623 Giày Sục Thể Thao Nữ Phối Họa Tiết Siêu
            Cute,Sneaker Êm Chân Đế Bằng Hot Trend
          </p>
          <div className="flex mt-[15px]">
            <div className="mr-[20px]">star</div>
            <div className="flex gap-x-[10px]">
              <span>1401 đánh giá</span>
              <span>890 lượt thích</span>
            </div>
          </div>
          <div className="flex items-center gap-x-[10px] mt-[15px]">
            <span className="line-through text-[17px]">230.000đ</span>
            <span className="text-[#ed1c24] text-[24px]">170.000đ</span>
          </div>
          <div className="">
            <span>FLASE SALE</span>
          </div>
          <p className="text-[14px] mt-[15px]">SALE THE THAO 149K</p>
          <div className="flex mt-[30px]">
            <p className="text-[14px] pr-[30px]">MAU</p>
            <div className="flex items-center gap-x-4">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={`w-[24px] h-[24px] rounded-full cursor-pointer ${
                    color.colorCode
                  } ${selectedColor === color.id ? "ring-2 ring-red-500" : ""}`}
                  onClick={() => setSelectedColor(color.id)}
                ></div>
              ))}
            </div>
          </div>
          <div className="mt-[30px] flex items-center">
            <p className="text-[14px] pr-[30px]">KICH THUOC</p>
            <div className="*:text-[14px] gap-x-[50px] flex items-center">
              {["37", "38", "39", "40"].map((size) => (
                <p
                  key={size}
                  className={`cursor-pointer px-2 py-1 border-[2px] ${
                    selectedSize === size
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </p>
              ))}
            </div>
          </div>
          <p className="text-[14px] pr-[30px] mt-[30px] hover:underline">
            HUONG DAN TIM SIZE
          </p>
          <div className="border-[2px] mt-[30px] border-red-500 w-[378px] h-[33px] flex justify-center items-center">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="red"
                className="size-4 mr-[5px] "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span className="text-red-600 text-[14px]">
                TIM SAN PHAM TAI SHOWROOM
              </span>
            </div>
          </div>
          <div className="mt-[10px] flex ">
            <p className="bg-red-500 text-white flex justify-center items-center text-[14px] w-[100px] h-[33px]">
              MUA NGAY
            </p>
            <p className="ml-[10px] flex justify-center items-center text-red-500 border-[2px] text-[14px] border-red-500 w-[268px] h-[33px]">
              THEM VAO GIO HANG
            </p>
          </div>
          <div className="bg-[#f6f6f6] h-[36px] mt-[15px] pl-[10px] flex items-center border border-[#e0e0e0]">
            <p className="text-[14px] font-semibold">KHUYEN MAI</p>
          </div>
          <div className="border border-[#e0e0e0] flex items-center pl-[10px] h-[70px]">
            <p className="w-[16px] flex justify-center items-center text-[11px] h-[16px] rounded-full text-white bg-blue-500 mr-[15px]">
              1
            </p>
            <span>THỂ THAO ĐỒNG GIÁ 149K</span>
            <span className="text-blue-500 pl-[10px]">
              (click de xem chi tiet)
            </span>
          </div>
          <div className="grid grid-cols-3">
            <div className="">
              <img src="" alt="" />
              <p>Bảo hành keo vĩnh viễn</p>
            </div>
            <div className="">
              <img src="" alt="" />
              <p>Bảo hành keo vĩnh viễn</p>
            </div>
            <div className="">
              <img src="" alt="" />
              <p>Bảo hành keo vĩnh viễn</p>
            </div>
            <div className="">
              <img src="" alt="" />
              <p>Bảo hành keo vĩnh viễn</p>
            </div>
            <div className="">
              <img src="" alt="" />
              <p>Bảo hành keo vĩnh viễn</p>
            </div>
            <div className="">
              <img src="" alt="" />
              <p>Bảo hành keo vĩnh viễn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
