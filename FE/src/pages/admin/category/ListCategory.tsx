import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryCT } from "../../../contexts/CategoryContext";
import { Category } from "../../../interfaces/Category";

const ListCategory = () => {
  const { categories, onRemoveCategory } = useContext(CategoryCT);

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
            {categories.map((category: Category, index: number) => (
              <tr key={category.id}>
                <th className="py-2 px-4 border-b">{index + 1}</th>
                <th className="py-2 px-4 border-b">{category.name}</th>
                <th className="py-2 px-4 border-b flex justify-center gap-[10px]">
                  <Link to={`/admin/category-edit/${category.id}`}>
                    <button className="btn btn-danger p-[10px] rounded-lg text-white bg-slate-500">
                      Cập nhật
                    </button>
                  </Link>
                  {category.name !== "Mặc định" && (
                    <button
                      className="btn btn-danger p-[10px] rounded-lg text-white bg-red-500"
                      onClick={() => onRemoveCategory(category.id)}
                    >
                      Xóa
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategory;
