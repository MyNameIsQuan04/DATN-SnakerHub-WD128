import React, { useContext } from "react";
import { ProductCT } from "../../contexts/ProductContext";
import { Product } from "../../interfaces/Product";
import { CategoryCT } from "../../contexts/CategoryContext";
import { Category } from "../../interfaces/Category";

type Props = {};

const Products = (props: Props) => {
  const { products } = useContext(ProductCT);
  const { categories } = useContext(CategoryCT);
  return (
    <div>
      <div className="container mx-auto my-8 px-4 md:px-8">
        <div className="flex flex-wrap -mx-4">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 px-4 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Brand</h3>
              <ul>
                <li>
                  <input type="checkbox" className="mr-2" />
                  American Eagle
                </li>
                <li>
                  <input type="checkbox" className="mr-2" />
                  Hollister
                </li>
                <li>
                  <input type="checkbox" className="mr-2" />
                  Pull &amp; Bear
                </li>
                <li>
                  <input type="checkbox" className="mr-2" />
                  Zara
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
              <ul>
                {categories.map((category: Category) => (
                  <li>
                    <input type="checkbox" className="mr-2" />
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          {/* Products Section */}
          <section className="w-full md:w-3/4 px-4">
            <h2 className="text-xl font-semibold mb-4">Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product Card */}
              {products.map((product: Product) => (
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
              ))}

              <div className="bg-white shadow-md rounded-lg p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Pink Icon Hoodie"
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h3 className="text-gray-700 font-semibold">Hollister</h3>
                <p className="text-gray-500 text-sm">Pink Icon Hoodie</p>
                <p className="text-blue-600 font-semibold mt-2">$230.00</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Navy Tie-Dye Icon Hoodie"
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h3 className="text-gray-700 font-semibold">Hollister</h3>
                <p className="text-gray-500 text-sm">
                  Navy Tie-Dye Icon Hoodie
                </p>
                <p className="text-blue-600 font-semibold mt-2">$255.00</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Navy Colorblock Hoodie"
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h3 className="text-gray-700 font-semibold">Hollister</h3>
                <p className="text-gray-500 text-sm">Navy Colorblock Hoodie</p>
                <p className="text-blue-600 font-semibold mt-2">$210.00</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products;
