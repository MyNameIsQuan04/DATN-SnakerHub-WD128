import React from "react";
import { Link } from "react-router-dom";

const AddProducts = () => {
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Thêm Sản Phẩm Mới</h1>

        <form>
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
              //   rows="4"
              placeholder="Nhập mô tả sản phẩm"
            ></textarea>
          </div>

          {/* Màu sắc (Chọn lựa) */}
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
              <option value="blue">Xanh</option>
              <option value="green">Xanh lá</option>
              <option value="yellow">Vàng</option>
              <option value="black">Đen</option>
            </select>
          </div>

          {/* Kích cỡ (Chọn lựa) */}
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

          {/* Ảnh đại diện */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="thumbnail"
            >
              Ảnh đại diện
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Ảnh phụ khác */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="images"
            >
              Ảnh phụ khác
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              multiple
            />
          </div>

          {/* Nút thêm sản phẩm */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Thêm Sản Phẩm
          </button>
          <Link to="/admin/product">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            >
              Quay lại
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
