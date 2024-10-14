import { Link } from "react-router-dom";
import { ProductCT } from "../../../contexts/productContext";
import { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { Product } from "../../../interfaces/Product";

const ListProduct = () => {
  const { products } = useContext(ProductCT);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Quản lý sản phẩm</h1>
      <Link
        to="/admin/product-add"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
      >
        Thêm Sản Phẩm Mới
      </Link>

      {/* Search Input */}
      <div className="mb-6 flex items-center gap-[10px] ">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3"
        />
        <IoMdSearch className="w-[30px] h-auto ml-[-50px]" />
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Hình Ảnh</th>
            <th className="py-2 px-4 border-b text-left">Tên Sản Phẩm</th>
            <th className="py-2 px-4 border-b text-left">Giá</th>
            <th className="py-2 px-4 border-b text-left">Mô Tả</th>
            <th className="py-2 px-4 border-b text-left">Số Lượng</th>
            <th className="py-2 px-4 border-b text-left">Màu Sắc</th>
            <th className="py-2 px-4 border-b text-left">Kích Cỡ</th>
            <th className="py-2 px-4 border-b text-left">Danh Mục</th>
            <th className="py-2 px-4 border-b text-left">Quản lí</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product, index: number) => (
            <tr key={product.id}>
              <th className="py-2 px-4 border-b text-left">{index + 1}</th>
              <th className="py-2 px-4 border-b text-left">
                <img src={product.thumbnail} alt="" />
              </th>
              <th className="py-2 px-4 border-b text-left">{product.name}</th>
              <th className="py-2 px-4 border-b text-left">
                {product.basePrice}
              </th>
              <th className="py-2 px-4 border-b text-left">
                {product.description}
              </th>
              <th className="py-2 px-4 border-b text-left"></th>
              <th className="py-2 px-4 border-b text-left">Màu Sắc</th>
              <th className="py-2 px-4 border-b text-left">Kích Cỡ</th>
              <th className="py-2 px-4 border-b text-left">Danh Mục</th>
              <th className="py-2 px-4 border-b text-left">Quản lí</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
