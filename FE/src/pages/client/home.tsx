import { useContext } from "react";
import { ProductCT } from "../../contexts/ProductContext";
import { Product } from "../../interfaces/Product";

const Home = () => {
  const { products } = useContext(ProductCT);
  return (
    <div className="">
      <div className="">BANNER</div>
      <div className="mt-[400px]">
        <p className="text-[30px] text-[#f2611c] px-[40px] font-bold">
          FLASH SALE
        </p>
        <div className="grid grid-cols-4 px-[40px] gap-[10px] mt-[20px]">
          {products.map((product: Product) => (
            <div className=" h-[471px] ">
              <div className="w-full h-[365px] bg-[url('https://picsum.photos/200/300')] bg-cover"></div>
              <p className="text-[25px] text-[#ed1c24] text-center font-bold pt-[5px]">
                {product.price}
              </p>
              <div className="rounded-[8px] w-[159px] h-[25px]  text-[12px] text-white content-center text-center bg-[url('https://www.mwcstore.net/Assets/App/images/general/flash-sale-line.png')] bg-cover mx-auto">
                {product.name}
              </div>
              <div className="flex items-center justify-center pt-[5px] gap-x-[10px]">
                <div className="w-[27px] h-[27px] bg-[#dadada] rounded-full"></div>
                <div className="w-[27px] h-[27px] bg-[#000000] rounded-full"></div>
                <div className="w-[27px] h-[27px] bg-[#784811] rounded-full"></div>
              </div>
            </div>
          ))}

          <div className=" h-[471px] ">
            <div className="w-full h-[365px] bg-[url('https://picsum.photos/200/300')] bg-cover"></div>
            <p className="text-[25px] text-[#ed1c24] text-center font-bold pt-[5px]">
              149.000đ
            </p>
            <div className="rounded-[8px] w-[159px] h-[25px]  text-[12px] text-white content-center text-center bg-[url('https://www.mwcstore.net/Assets/App/images/general/flash-sale-line.png')] bg-cover mx-auto">
              ĐÃ BÁN: 16
            </div>
            <div className="flex items-center justify-center pt-[5px] gap-x-[10px]">
              <div className="w-[27px] h-[27px] bg-[#dadada] rounded-full"></div>
              <div className="w-[27px] h-[27px] bg-[#000000] rounded-full"></div>
              <div className="w-[27px] h-[27px] bg-[#784811] rounded-full"></div>
            </div>
          </div>
          <div className=" h-[471px] ">
            <div className="w-full h-[365px] bg-[url('https://picsum.photos/200/300')] bg-cover"></div>
            <p className="text-[25px] text-[#ed1c24] text-center font-bold pt-[5px]">
              149.000đ
            </p>
            <div className="rounded-[8px] w-[159px] h-[25px]  text-[12px] text-white content-center text-center bg-[url('https://www.mwcstore.net/Assets/App/images/general/flash-sale-line.png')] bg-cover mx-auto">
              ĐÃ BÁN: 16
            </div>
            <div className="flex items-center justify-center pt-[5px] gap-x-[10px]">
              <div className="w-[27px] h-[27px] bg-[#dadada] rounded-full"></div>
              <div className="w-[27px] h-[27px] bg-[#000000] rounded-full"></div>
              <div className="w-[27px] h-[27px] bg-[#784811] rounded-full"></div>
            </div>
          </div>
          <div className=" h-[471px] ">
            <div className="w-full h-[365px] bg-[url('https://picsum.photos/200/300')] bg-cover"></div>
            <p className="text-[25px] text-[#ed1c24] text-center font-bold pt-[5px]">
              149.000đ
            </p>
            <div className="rounded-[8px] w-[159px] h-[25px]  text-[12px] text-white content-center text-center bg-[url('https://www.mwcstore.net/Assets/App/images/general/flash-sale-line.png')] bg-cover mx-auto">
              ĐÃ BÁN: 16
            </div>
            <div className="flex items-center justify-center pt-[5px] gap-x-[10px]">
              <div className="w-[27px] h-[27px] bg-[#dadada] rounded-full"></div>
              <div className="w-[27px] h-[27px] bg-[#000000] rounded-full"></div>
              <div className="w-[27px] h-[27px] bg-[#784811] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
