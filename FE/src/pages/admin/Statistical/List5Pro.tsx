import { useEffect, useState } from "react";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  sales_count: number;
  short_description: string;
}

const List5Pro = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard")
      .then((response) => {
        if (response.data.success && response.data.list5Pro) {
          // Sắp xếp sản phẩm theo sales_count từ cao xuống thấp
          const sortedProducts = response.data.list5Pro.sort(
            (a: Product, b: Product) => b.sales_count - a.sales_count
          );
          setProducts(sortedProducts); // Cập nhật state với dữ liệu sản phẩm
        } else {
          setError("Không có sản phẩm nào.");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        setError("Lỗi khi tải dữ liệu sản phẩm.");
      });
  }, []);

  // Xử lý khi có lỗi hoặc chưa có dữ liệu
  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="bg-white py-2 rounded-lg shadow-lg">
      {/* Tiêu đề */}
      <span className=" mt-3 text-gray-800 mb-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        Top sản phẩm bán chạy
      </span>

      {/* Danh sách sản phẩm */}
      <div className="mt-3 max-h-96 overflow-y-auto scroll-hidden">
        {" "}
        {/* Áp dụng lớp scroll-hidden */}
        <div className="space-y-4 px-2">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white p-4 rounded-lg shadow-md flex items-start space-x-4 
                ${
                  index === 0
                    ? "bg-yellow-100 border-l-8 border-yellow-500"
                    : ""
                }
                ${index === 1 ? "bg-blue-100 border-l-8 border-blue-500" : ""}
                ${index === 2 ? "bg-green-100 border-l-8 border-green-500" : ""}
                hover:shadow-lg transition-shadow duration-300`} // Các hiệu ứng cho Top 1, Top 2, Top 3
            >
              <h1 className="flex items-center font-semibold">{index + 1}</h1>
              {/* Hình ảnh sản phẩm */}
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Thông tin sản phẩm */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>

                {/* Phần mô tả */}
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {product.description}
                </p>

                {/* Thông tin giá cả và số lượng bán */}
                <div className="flex justify-between items-center">
                  <span className="text-md font-bold text-green-600">
                    {product.price.toLocaleString()} VND
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.sales_count} đã bán
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List5Pro;
