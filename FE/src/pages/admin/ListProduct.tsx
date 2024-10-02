import React from "react";
import { Link } from "react-router-dom";

const ListProduct = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Quản lý sản phẩm</h1>
      <Link
        to="/admin/product-add"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
      >
        Thêm Sản Phẩm Mới
      </Link>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3"
        />
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Hình Ảnh</th>
            <th className="py-2 px-4 border-b text-left">Tên Sản Phẩm</th>
            <th className="py-2 px-4 border-b text-left">Giá</th>
            <th className="py-2 px-4 border-b text-left">Mô Tả</th>
            <th className="py-2 px-4 border-b text-left">Số Lượng</th>
            <th className="py-2 px-4 border-b text-left">Màu Sắc</th>
            <th className="py-2 px-4 border-b text-left">Kích Cỡ</th>
            <th className="py-2 px-4 border-b text-left">Danh Mục</th>
            <th className="py-2 px-4 border-b text-left">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <td className="py-2 px-4"></td>
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;