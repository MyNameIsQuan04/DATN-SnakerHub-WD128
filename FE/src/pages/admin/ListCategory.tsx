import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://datn.test/DATN-SnakerHub-WD128/BE/public/admin/categories"
        ); // Thay URL của API của bạn vào đây
        setCategories(response.data);
        console.log(response.data); // In ra dữ liệu danh mục để kiểm tra
      } catch (err) {
        console.log(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Quản lý danh mục</h1>
        <Link
          to="/admin/category-add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
        >
          Thêm Danh Mục Mới
        </Link>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Tên danh mục</th>
              <th className="py-2 px-4 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category: any, index: number) => (
                <tr key={category.id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{category.name}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/admin/category-edit/${category.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Sửa
                    </Link>
                    &nbsp;|&nbsp;
                    <button className="text-red-600 hover:text-red-800">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-center">
                  Không có danh mục nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategory;
