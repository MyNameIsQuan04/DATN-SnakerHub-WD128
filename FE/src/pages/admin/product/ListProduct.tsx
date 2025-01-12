import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import React, { useContext, useEffect, useState } from "react";
import { Product } from "../../../interfaces/Product";
import { ToastContainer } from "react-toastify";
import { ProductCT } from "../../../contexts/productContext";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { useAuth } from "../../../contexts/AuthContext";
import { Gallery } from "../../../interfaces/Gallery";

const ListProduct = () => {
  const { user } = useAuth();

  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const { products, onRemoveProduct, loading } = useContext(ProductCT);
  const toggleVariations = (productId: number) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  // State cho tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products); // Set filteredProducts ban đầu là tất cả sản phẩm

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(products); // Hiển thị tất cả sản phẩm nếu không có từ khóa tìm kiếm
    } else {
      const results = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [products, searchQuery]);

  const handleSearchChange = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto p-4">
      <div>
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
      <div className="flex items-center gap-2 mt-4 mb-6">
        <Link
          to="/admin/product-add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Thêm Sản Phẩm Mới
        </Link>
        <div className="relative flex items-center w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm sản phẩm"
            className="w-full p-2 border rounded-lg pl-10"
          />
          <IoMdSearch className="absolute left-3 text-2xl text-gray-500" />
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-center">STT</th>
              <th className="py-3 px-4 border-b text-center">Hình Ảnh</th>
              <th className="py-3 px-4 border-b text-center">Tên Sản Phẩm</th>
              <th className="py-3 px-4 border-b text-center">Mô Tả</th>
              <th className="py-3 px-4 border-b text-center">Mô Tả Đầy Đủ</th>
              <th className="py-3 px-4 border-b text-center">Giá</th>
              <th className="py-3 px-4 border-b text-center">Biến Thể</th>
              <th className="py-3 px-4 border-b text-center">Danh Mục</th>
              <th className="py-3 px-4 border-b text-center">Quản Lý</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Đang tải sản phẩm...
                </td>
              </tr>
            ) : filteredProducts.length === 0 && searchQuery ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Không tìm thấy sản phẩm nào
                </td>
              </tr>
            ) : (
              filteredProducts.map((product: Product, index: number) => (
                <React.Fragment key={product.id}>
                  <tr className="hover:bg-gray-50 ">
                    <td className="py-3 px-4 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <img
                        src={
                          product.thumbnail || "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 border-b text-center max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.description}
                    </td>
                    <td className="py-3 px-4 border-b text-center max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {product.short_description}
                    </td>

                    <td className="py-3 px-4 border-b">
                      {product.price > 0 ? (
                        <span>{product.price.toLocaleString()} VND</span>
                      ) : (
                        <span>Tùy theo biến thể</span>
                      )}
                    </td>

                    {/* Nút xem biến thể */}
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        className={`${
                          expandedProduct === product.id
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105`}
                        onClick={() => toggleVariations(product.id)}
                      >
                        {expandedProduct === product.id
                          ? "Ẩn biến thể"
                          : "Xem biến thể"}
                      </button>
                    </td>

                    <td className="py-3 px-4 border-b text-center">
                      {product.category?.name}
                    </td>

                    {/* Nút quản lý */}
                    <td className="py-3 px-4 border-b">
                      <Link
                        to={`/admin/product-edit/${product.id}`}
                        className="btn btn-danger p-[10px] rounded-lg text-white bg-slate-500"
                      >
                        Chỉnh sửa
                      </Link>
                      {user?.role_id === 1 && (
                        <button
                          onClick={() => onRemoveProduct(product.id)}
                          className="btn btn-danger p-[10px] rounded-lg text-white bg-red-500"
                        >
                          Xóa
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Hiển thị biến thể nếu nút được nhấn */}
                  {expandedProduct === product.id && (
                    <tr>
                      <td colSpan={10} className="py-2 px-4 border-b">
                        <table className="min-w-full bg-gray-100 border border-gray-200">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="py-2 px-3 text-left">Hình ảnh</th>
                              <th className="py-2 px-3 text-left">Màu</th>
                              <th className="py-2 px-3 text-left">Kích cỡ</th>
                              <th className="py-2 px-3 text-left">Giá nhập</th>
                              <th className="py-2 px-3 text-left">Giá</th>
                              <th className="py-2 px-3 text-left">Số lượng</th>
                              <th className="py-2 px-3 text-left">SKU</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.product_variants.map((variant, vIndex) => (
                              <tr key={vIndex}>
                                <td className="py-1 px-3 border-b">
                                  <img
                                    src={variant.image}
                                    alt={`Biến thể ${variant.color} - ${variant.size}`}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                </td>
                                <td className="py-1 px-3 border-b">
                                  {variant.color}
                                </td>
                                <td className="py-1 px-3 border-b">
                                  {variant.size}
                                </td>
                                <td className="py-1 px-3 border-b">
                                  {variant.entry_price.toLocaleString()} VND
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
                            ))}
                          </tbody>
                        </table>

                        {/* Hiển thị galleries */}
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">
                            Bộ sưu tập hình ảnh:
                          </h4>
                          <div className="flex gap-4">
                            {product.galleries &&
                            product.galleries.length > 0 ? (
                              product.galleries.map(
                                (gallery: Gallery, gIndex) => (
                                  <img
                                    key={gIndex}
                                    src={gallery.image_path}
                                    alt={`Gallery ${gIndex + 1}`}
                                    className="w-20 h-20 object-cover rounded border"
                                  />
                                )
                              )
                            ) : (
                              <p>Không có hình ảnh trong bộ sưu tập.</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListProduct;
