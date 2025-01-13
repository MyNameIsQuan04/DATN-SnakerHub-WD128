import { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  color: string;
  size: string;
  sales_count: number;
  short_description: string;
  sell_count: number;
}

const List5ProStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true); // Đặt loading thành true khi bắt đầu tải dữ liệu
    axios
      .get("http://localhost:8000/api/dashboard")
      .then((response) => {
        setLoading(false); // Đặt loading thành false khi đã nhận được dữ liệu
        if (response.data.success && response.data.lowStockProducts) {
          setLowStockProducts(response.data.lowStockProducts);
        } else {
          setError("Không có sản phẩm nào.");
        }
      })
      .catch((error) => {
        setLoading(false); // Đặt loading thành false khi có lỗi
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        setError("Lỗi khi tải dữ liệu sản phẩm.");
      });
  }, []);

  return (
    <div className=" py-2 ">
      {/* Tiêu đề */}
      <span className="mt-3 text-gray-800 mb-4 px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        Các sản phẩm còn dưới 5
      </span>

      {/* Kiểm tra trạng thái loading */}
      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Đang tải sản phẩm ....
          </span>
        </div>
      ) : (
        <div className="mt-3 max-h-96 overflow-y-auto scroll-hidden">
          <div className="space-y-4 px-2">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product, index) => (
                <div
                  key={product.product_id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4 hover:shadow-lg transition-all duration-300"
                >
                  <h1 className="flex items-center font-semibold">
                    {index + 1}
                  </h1>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                      {product.product_id}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h3>

                    {/* Phần mô tả */}
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                        {product.color}
                      </p>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                        {product.size}
                      </p>
                    </div>

                    {/* Thông tin giá cả và số lượng bán */}
                    <div className="flex justify-between items-center">
                      <span className="text-md font-bold text-green-600">
                        {product.price.toLocaleString()} VND
                      </span>
                      <span className="text-sm text-gray-500">
                        Còn lại {product.stock} sản phẩm
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-10">
                Không có sản phẩm dưới 5 sản phẩm
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="text-red-500 font-semibold text-center">{error}</div>
      )}
    </div>
  );
};

export default List5ProStock;
