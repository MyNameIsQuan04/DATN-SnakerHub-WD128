import React, { useContext, useState } from "react";
import { ProductCT } from "../../contexts/ProductContext";
import { Product } from "../../interfaces/Product";
import { CategoryCT } from "../../contexts/CategoryContext";
import { Category } from "../../interfaces/Category";
import { Link } from "react-router-dom";

type Props = {};

const Products = (props: Props) => {
  const { products } = useContext(ProductCT);
  const { categories } = useContext(CategoryCT);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = products.filter(
    (product: Product) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.id as string)
  );

  return (
    <div>
      <div className="container mx-auto my-8 px-4 md:px-8">
        <div className="flex flex-wrap -mx-4">
          {/* Filters Sidebar */}
          <aside className="w-1/5 px-4 mb-6 ">
            <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-700 mb-3">
                Danh mục
              </h3>
              <ul className="space-y-2">
                {categories.map((category: Category) => (
                  <li key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded mr-3"
                      checked={selectedCategories.includes(
                        category.id as string
                      )}
                      onChange={() => toggleCategory(category.id as string)}
                    />
                    <span className="text-gray-600">{category.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          {/* Products Section */}
          <section className="w-4/5 px-4">
            <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product Card */}
              {filteredProducts.map((product: Product) => (
                <Link to={`/detail/${product.id}`} key={product.id}>
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Gray Colorblock Hoodie"
                      className="w-full h-40 object-cover mb-4 rounded-md"
                    />
                    <h3 className="text-gray-700 font-semibold">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {product.category.name}
                    </p>
                    <p className="text-blue-600 font-semibold mt-2">
                      {product.price} đ
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products;
