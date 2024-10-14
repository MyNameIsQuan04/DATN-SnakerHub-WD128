import React from "react";
import { Link } from "react-router-dom";

const ListSize = () => {
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Quản lý kích cỡ</h1>
        <Link
          to="/admin/size-add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
        >
          Thêm Danh Mục Mới
        </Link>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Tên danh mục</th>
              <th className="py-2 px-4 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <td className="py-2 px-4"></td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListSize;
