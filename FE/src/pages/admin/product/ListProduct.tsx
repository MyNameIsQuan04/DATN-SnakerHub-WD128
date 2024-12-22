import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import React, { useContext, useState } from "react";
import { Product } from "../../../interfaces/Product";
import { ToastContainer } from "react-toastify";
import { ProductCT } from "../../../contexts/productContext";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";

const ListProduct = () => {
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const { products, onRemoveProduct } = useContext(ProductCT);
  const toggleVariations = (productId: number) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <h2 className="font-bold text-[30px]">Quản lý sản phẩm</h2>
        <div className="flex items-center gap-2 ml-2">
          <div className="flex gap-1">
            <IoHomeOutline />
            <GrFormNext />
          </div>
          <h3 className="underline">Quản lý sản phẩm</h3>
        </div>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex items-center gap-5 flex-wrap mt-3">
        {/* Search Input Section */}
        {/* <div className="relative flex items-center w-full md:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)]">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="border border-gray-300 rounded-lg py-2 pl-4 pr-10 w-full focus:outline-blue-500"
          />
          <IoMdSearch className="absolute right-3 text-gray-500 w-5 h-5" />
        </div> */}

        {/* Add Product Button */}
        <div>
          <Link
            to="/admin/product-add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Thêm Sản Phẩm Mới
          </Link>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b text-left">STT</th>
            <th className="py-3 px-4 border-b text-left">Hình Ảnh</th>
            <th className="py-3 px-4 border-b text-left">Tên Sản Phẩm</th>
            <th className="py-3 px-4 border-b text-left">Mô Tả</th>
            <th className="py-3 px-4 border-b text-left">Mô Tả Đầy đủ</th>
            <th className="py-3 px-4 border-b text-left">Giá</th>
            <th className="py-3 px-4 border-b text-left">Biến Thể</th>
            <th className="py-3 px-4 border-b text-left">Danh Mục</th>
            <th className="py-3 px-4 border-b text-left">Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product, index: number) => (
            <React.Fragment key={product.id}>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-left">{index + 1}</td>
                <td className="py-3 px-4 border-b text-left">
                  <img
                    src={product.thumbnail || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4 border-b text-left">{product.name}</td>
                <td className="py-3 px-4 border-b text-left">
                  {product.description}
                </td>
                <td className="py-3 px-4 border-b text-left">
                  {product.short_description}
                </td>

                {/* Hiển thị giá sản phẩm hoặc thông báo phụ thuộc biến thể */}
                <td className="py-3 px-4 border-b text-left">
                  {product.price > 0 ? (
                    <span>{product.price.toLocaleString()} VND</span>
                  ) : (
                    <span>Tùy theo biến thể</span>
                  )}
                </td>

                {/* Nút xem biến thể */}
                <td className="py-3 px-4 border-b text-left">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => toggleVariations(product.id as number)}
                  >
                    {expandedProduct === product.id
                      ? "Ẩn biến thể"
                      : "Xem biến thể"}
                  </button>
                </td>

                <td className="py-3 px-4 border-b text-left">
                  {product.category?.name}
                </td>

                {/* Nút quản lý */}
                <td className="py-3 px-4 border-b text-left">
                  <Link
                    to={`/admin/product-edit/${product.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                  >
                    Chỉnh sửa
                  </Link>
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded ml-2"
                  >
                    Xóa
                  </button>
                </td>
              </tr>

              {/* Hiển thị biến thể nếu nút được nhấn */}
              {expandedProduct === product.id && (
                <tr>
                  <td colSpan={8} className="py-2 px-4 border-b">
                    <table className="min-w-full bg-gray-100 border border-gray-200">
                      <thead>
                        <tr>
                          <th className="py-2 px-3 text-left">Hình ảnh</th>
                          <th className="py-2 px-3 text-left">Màu</th>
                          <th className="py-2 px-3 text-left">Kích cỡ</th>
                          <th className="py-2 px-3 text-left">Giá</th>
                          <th className="py-2 px-3 text-left">Số lượng</th>
                          <th className="py-2 px-3 text-left">SKU</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.product_variants.map(
                          (variant, vIndex: number) => (
                            <tr key={vIndex}>
                              <td className="py-1 px-3 border-b">
                                <img
                                  src={variant.image}
                                  alt={`Biến thể ${variant.color.name} - ${variant.size.name}`}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              </td>
                              <td className="py-1 px-3 border-b">
                                {variant.color.name}
                              </td>
                              <td className="py-1 px-3 border-b">
                                {variant.size.name}
                              </td>
                              <td className="py-1 px-3 border-b">
                                {variant.price.toLocaleString()} VND
                              </td>
                              <td className="py-1 px-3 border-b">
                                {variant.stock}
                              </td>
                              <td className="py-1 px-3 border-b">
                                {variant.sku}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    {/* Hiển thị gallery */}
                    {product.galleries && product.galleries.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Thư viện ảnh:</h3>
                        <div className="flex gap-2">
                          {product.galleries.map((image) => (
                            <img
                              key={image.id}
                              src={image.image_path}
                              alt="Hình ảnh sản phẩm"
                              className="w-24 h-24 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ListProduct;
