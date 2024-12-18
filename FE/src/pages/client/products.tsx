import { useContext, useEffect, useState } from "react";
import { ProductCT } from "../../contexts/productContext";
import { Product } from "../../interfaces/Product";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../configs/axios";
import { Size } from "../../interfaces/Size";
import { Color } from "../../interfaces/Color";
import { Category } from "../../interfaces/Category";
import axios from "axios";
import { getProductsClients } from "../../services/client/product";
import { GetCategoriesClient } from "../../services/client/category";
import { getColorsClient } from "../../services/client/color";
import { getSizesClient } from "../../services/client/size";

interface Filters {
  category: string | number | null;
  price_min: number | null;
  price_max: number | null;
  size: number | null;
  color: number | null;
}

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [productsClient, setProductsClient] = useState<Product[]>([]);
  const [categoriesClient, setCategoriesClient] = useState<Category[]>([]);
  const [colorsClient, setColorsClient] = useState<Color[]>([]);
  const [sizesClient, setSizesClient] = useState<Size[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getProductsClients();
      const productsData = response.products || [];
      setProductsClient(productsData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await GetCategoriesClient();
      const categoriesData = response || [];
      setCategoriesClient(categoriesData);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const response = await getColorsClient();
      const categoriesData = response || [];
      setColorsClient(categoriesData);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const response = await getSizesClient();
      const categoriesData = response || [];
      setSizesClient(categoriesData);
    })();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const categoryId = searchParams.get("categoryId");
  const [filters, setFilters] = useState<Filters>({
    category: categoryId ? parseInt(categoryId) : null,
    price_min: null,
    price_max: null,
    size: null,
    color: null,
  });

  const [tempFilters, setTempFilters] = useState<Filters>({ ...filters });
  const paginatedProducts = productsClient.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(productsClient.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const fetchSearchedProducts = async (keyword: string) => {
    try {
      const response = await api.get("search", {
        params: { keyword },
      });
      setProductsClient(response.data.products);
    } catch (error) {
      console.error("Có lỗi xảy ra khi tìm kiếm sản phẩm:", error);
    }
  };

  const fetchFilteredProducts = async (filters: Filters) => {
    try {
      const response = await api.get("filter", {
        params: filters,
      });
      setProductsClient(response.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lọc sản phẩm:", error);
    }
  };

  const applyFilters = () => {
    searchParams.delete("keyword");
    setSearchParams(searchParams);
    setFilters(tempFilters);
    fetchFilteredProducts(tempFilters);
  };

  // Get Categories
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/client/categories"
      );
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (keyword) {
      fetchSearchedProducts(keyword);
    } else {
      fetchFilteredProducts(filters);
    }
  }, [keyword, filters]);
  useEffect(() => {
    if (categoryId) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: parseInt(categoryId),
      }));
    }
  }, [categoryId]);
  return (
    <div>
      <div className="container mx-auto my-8 px-4 md:px-8 mt-[100px]">
        <div className="flex flex-wrap -mx-4">
          <aside className="w-1/5 px-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>
            <h3 className="font-semibold text-lg text-gray-700 mb-3">
              Danh mục
            </h3>
            <ul className="space-y-2">
              {categories.map((category: Category) => (
                <li key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded mr-3"
                    onChange={(e) => {
                      setTempFilters((prev) => ({
                        ...prev,
                        category: e.target.checked ? category.id : null,
                      }));
                    }}
                  />
                  <span className="text-gray-600">{category.name}</span>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-lg text-gray-700 mt-4 mb-3">
              Kích thước
            </h3>
            <select
              className="border px-2 py-1 w-full"
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  size: e.target.value ? parseInt(e.target.value) : null,
                }))
              }
            >
              <option value="">Chọn kích thước</option>
              {sizesClient?.map((size: Size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
            <h3 className="font-semibold text-lg text-gray-700 mt-4 mb-3">
              Màu sắc
            </h3>
            <select
              className="border px-2 py-1 w-full"
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  color: e.target.value ? parseInt(e.target.value) : null,
                }))
              }
            >
              <option value="">Chọn màu sắc</option>
              {colorsClient?.map((color: Color) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
            <h3 className="font-semibold text-lg text-gray-700 mt-4 mb-3">
              Giá
            </h3>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Giá tối thiểu"
                className="border px-2 py-1 w-full"
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    price_min: e.target.value ? parseInt(e.target.value) : null,
                  }))
                }
              />
              <input
                type="number"
                placeholder="Giá tối đa"
                className="border px-2 py-1 w-full"
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    price_max: e.target.value ? parseInt(e.target.value) : null,
                  }))
                }
              />
            </div>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
              onClick={applyFilters}
            >
              Áp dụng bộ lọc
            </button>
          </aside>

          <section className="w-4/5 px-4">
            {keyword && (
              <div className="flex gap-1 items-center">
                <span className="mb-4">Kết quả tìm kiếm theo từ khóa</span>
                <h2 className="text-xl font-semibold mb-4 text-red-500">
                  '{keyword}'
                </h2>
              </div>
            )}
            <div className="flex gap-1 items-center">
              <span className="text-xl font-semibold mb-4">Sản phẩm</span>
            </div>
            {paginatedProducts.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paginatedProducts.map((product: Product) => (
                    <Link to={`/detail/${product.id}`} key={product.id}>
                      <div className="relative border border-gray-200 hover:border-gray-400 transition duration-300">
                        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1">
                          HOT
                        </div>
                        <div className="h-[245px] w-full overflow-hidden">
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="w-full px-2 mx-auto mt-3">
                          <div className="text-[19px] font-bold uppercase transition duration-300 hover:text-[#f2611c]">
                            {product.name}
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-2">
                          <p className="text-[17px] uppercase pt-[5px] text-gray-400">
                            {product.category.name}
                          </p>
                          <div className="flex text-yellow-400 text-sm">
                            <span>⭐</span> <span>⭐</span> <span>⭐</span>{" "}
                            <span>⭐</span> <span>⭐</span>
                          </div>
                        </div>
                        <p className="text-[17px] px-2 font-bold py-[5px]">
                          {product.price.toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Phân trang */}
                <div className="flex justify-center items-center mt-6">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 mx-1 border rounded ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>Không tìm thấy sản phẩm phù hợp.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products;
