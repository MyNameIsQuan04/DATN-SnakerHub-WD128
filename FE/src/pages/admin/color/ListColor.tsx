import { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorCT } from "../../../contexts/ColorContext";
import { Color } from "../../../interfaces/Color";

const ListColor = () => {
  const { colors, onRemoveColor } = useContext(ColorCT);
  console.log(colors);
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Quản lý màu sắc</h1>
        <Link
          to="/admin/color-add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
        >
          Tạo Màu Mới
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
            {colors.map((color: Color, index: number) => (
              <tr>
                <th className="py-2 px-4 border-b">{index + 1}</th>
                <th className="py-2 px-4 border-b">{color.name}</th>
                <th className="py-2 px-4 border-b flex justify-center gap-[10px]">
                  <Link to={`/admin/color-edit/${color.id}`}>
                    <button className="btn btn-danger p-[10px] rounded-lg text-white bg-slate-500">
                      Cập nhật
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger p-[10px] rounded-lg text-white bg-red-500"
                    onClick={() => onRemoveColor(color.id)}
                  >
                    Xóa
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListColor;
