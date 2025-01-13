import { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  sales_count: number;
  short_description: string;
  sell_count: number;
}

const List5Pro = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/dashboard")
      .then((response) => {
        setLoading(false);
        if (response.data.success && response.data.list5Pro) {
          const sortedProducts = response.data.list5Pro.sort(
            (a: Product, b: Product) => b.sales_count - a.sales_count
          );
          setProducts(sortedProducts);
        } else {
          setError("Không có sản phẩm nào.");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        setError("Lỗi khi tải dữ liệu sản phẩm.");
      });
  }, []);

  return (
    <div className="bg-white py-2">
      <span className="mt-3 mb-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        Top sản phẩm bán chạy
      </span>

      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Đang tải sản phẩm ....
          </span>
        </div>
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="mt-3 max-h-96 overflow-y-auto scroll-hidden">
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
                  ${
                    index === 2
                      ? "bg-green-100 border-l-8 border-green-500"
                      : ""
                  }
                  hover:shadow-lg transition-shadow duration-300`}
              >
                <h1 className="flex items-center font-semibold">{index + 1}</h1>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-md font-bold text-green-600">
                      {product.price.toLocaleString()} VND
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.sell_count} đã bán
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-500 font-semibold text-center">{error}</div>
      )}
    </div>
  );
};

export default List5Pro;
