import React, { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/User";
import axios from "axios";

const ListUser = () => {
  const [listUser, setListUser] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users`);
        setListUser(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Quản lý người dùng
      </h1>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-center">
              <th className="py-3 px-4 font-bold">ID</th>
              <th className="py-3 px-4 font-bold">Tên người dùng</th>
              <th className="py-3 px-4 font-bold">Số điện thoại</th>
              <th className="py-3 px-4 font-bold">Email</th>
              <th className="py-3 px-4 font-bold">Địa chỉ</th>
              <th className="py-3 px-4 font-bold">Quyền truy cập</th>
              <th className="py-3 px-4 font-bold">Ngày tạo</th>
              <th className="py-3 px-4 font-bold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                <td className="py-4 px-4">{user.id}</td>
                <td className="py-4 px-4">{user.name}</td>
                <td className="py-4 px-4">{user.phone_number}</td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-4 px-4">{user.address}</td>
                <td className="py-4 px-4 font-medium">{user.type}</td>
                <td className="py-4 px-4">{user.created_at}</td>
                <td className="py-4 px-4">
                  <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors">
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUser;
