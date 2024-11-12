import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import React, { useContext, useState } from "react";
import { ProductCT } from "../../../contexts/ProductContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Product, product_variants } from "../../../interfaces/Product";
import { ToastContainer } from "react-toastify";

const ListProduct = () => {
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const { products, onRemoveProduct } = useContext(ProductCT);
  // const products = [
  //   {
  //     id: 1,
  //     name: "Sản phẩm A",
  //     price: 100000,
  //     category: {
  //       id: 1,
  //       name: "Danh mục 1",
  //     },
  //     description: "adwdadw",
  //     gallery: [
  //       {
  //         id: 1,
  //         image_path: "https://via.placeholder.com/150",
  //       },
  //       {
  //         id: 2,
  //         image_path: "https://via.placeholder.com/150",
  //       },
  //     ],
  //     thumbnail: "https://via.placeholder.com/150",
  //     product_variants: [
  //       {
  //         color: {
  //           id: 1,
  //           name: "Đỏ",
  //         },
  //         size: {
  //           id: 1,
  //           name: "L",
  //         },
  //         price: 120000,
  //         stock: 10,
  //         image: "https://via.placeholder.com/150",
  //       },
  //     ],
  //   },
  // ];
  const toggleVariations = (productId: number) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };
  console.log(products);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Quản lý sản phẩm</h1>
      <Link
        to="/admin/product-add"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
      >
        Thêm Sản Phẩm Mới
      </Link>

      {/* Tìm kiếm */}
      <div className="mb-6 flex items-center gap-[10px]">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3"
        />
        <IoMdSearch className="w-[30px] h-auto ml-[-50px]" />
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
                    src={product.thumbnail}
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
      <ToastContainer/>
    </div>
  );
};

export default ListProduct;
