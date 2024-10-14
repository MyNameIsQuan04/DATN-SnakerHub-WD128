import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryCT } from "../../../contexts/CategoryContext";
import { Category } from "../../../interfaces/Category";

const AddProducts = () => {
  const { categories } = useContext(CategoryCT);
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-auto">
      <div className="bg-white w-full max-w-4xl mx-auto p-8 rounded-lg shadow-lg relative overflow-y-auto max-h-screen">
        {/* Tiêu đề Thêm Sản Phẩm */}
        <h1 className="text-3xl font-semibold mb-6 sticky top-[-40px] bg-white py-4 z-20 border-b border-gray-300">
          Thêm Sản Phẩm Mới
        </h1>

        <form className="p-4">
          {/* Phần 1: Thông tin cơ bản */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Thông tin sản phẩm</h2>

            {/* Tên sản phẩm */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            {/* Giá sản phẩm */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Giá sản phẩm
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nhập giá sản phẩm"
              />
            </div>

            {/* Danh mục sản phẩm */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Danh mục sản phẩm
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category: Category, index: number) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mô tả sản phẩm */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Mô tả sản phẩm
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nhập mô tả sản phẩm"
              ></textarea>
            </div>

            {/* Ảnh sản phẩm */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="productImage"
              >
                Ảnh sản phẩm
              </label>
              <input
                type="file"
                id="productImage"
                name="productImage"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Phần 2: Biến thể sản phẩm */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Biến thể sản phẩm</h2>

            {/* Giá sản phẩm */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Giá sản phẩm biến thể
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nhập giá sản phẩm"
              />
            </div>

            {/* Màu sắc */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="color"
              >
                Màu sắc
              </label>
              <select
                id="color"
                name="color"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Chọn màu sắc</option>
                <option value="red">Đỏ</option>
                <option value="blue">Xanh dương</option>
                <option value="green">Xanh lá</option>
                <option value="yellow">Vàng</option>
                <option value="black">Đen</option>
              </select>
            </div>

            {/* Kích cỡ */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="size"
              >
                Kích cỡ
              </label>
              <select
                id="size"
                name="size"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Chọn kích cỡ</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            {/* Số lượng */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="quantity"
              >
                Số lượng
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Nhập số lượng"
              />
            </div>

            {/* Ảnh biến thể */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="variantImages"
              >
                Ảnh biến thể (chọn nhiều ảnh)
              </label>
              <input
                type="file"
                id="variantImages"
                name="variantImages"
                accept="image/*"
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Nút thêm sản phẩm */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Thêm Sản Phẩm
            </button>

            <Link to="/admin/product">
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Quay lại
              </button>
            </Link>
          </div>
        </form>

        {/* Nút đóng modal */}
        <Link to="/admin/product">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddProducts;
