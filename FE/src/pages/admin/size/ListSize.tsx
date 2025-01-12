import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SizeCT } from "../../../contexts/SizeContext";
import { Size } from "../../../interfaces/Size";
import { useAuth } from "../../../contexts/AuthContext";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";

const ListSize = () => {
  const { user } = useAuth();

  const { sizes, onRemoveSize } = useContext(SizeCT);
  return (
    <div>
      <div className="container mx-auto p-4">
        <h2 className="font-bold text-[30px]">Quản lý kích thước</h2>
        <div className="flex items-center gap-2 ml-2 mb-4">
          <div className="flex gap-1">
            <IoHomeOutline />
            <GrFormNext />
          </div>
          <h3 className="underline">Danh mục kích thước</h3>
        </div>
        <Link
          to="/admin/size-add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 inline-block"
        >
          Thêm kích cỡ mới
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
            {sizes.map((size: Size, index: number) => (
              <tr key={size.id}>
                <th className="py-2 px-4 border-b">{index + 1}</th>
                <th className="py-2 px-4 border-b">{size.name}</th>
                <th className="py-2 px-4 border-b flex justify-center gap-[10px]">
                  <Link to={`/admin/size-edit/${size.id}`}>
                    <button className="btn btn-danger p-[10px] rounded-lg text-white bg-slate-500">
                      Chỉnh sửa
                    </button>
                  </Link>
                  {user?.role_id === 1 && (
                    <div className="">
                      {size.name !== "Mặc định" && (
                        <button
                          className="btn btn-danger p-[10px] rounded-lg text-white bg-red-500"
                          onClick={() => onRemoveSize(size.id)}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
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

export default ListSize;
