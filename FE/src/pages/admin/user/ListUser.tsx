import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../../interfaces/User";
import { ToastContainer, toast } from "react-toastify";

const ListUser = () => {
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

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

  const openModal = (user: IUser) => {
    if (user.type === "user") {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      toast.success("Người dùng đã là Admin");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const upgradeToAdmin = async () => {
    if (!selectedUser) return;

    try {
      await axios.patch(`http://localhost:8000/api/users/${selectedUser.id}`, {
        type: "admin",
      });

      setListUser((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, type: "admin" } : user
        )
      );
      toast.success("Cấp quyền Admin thành công");
      closeModal();
    } catch (error) {
      toast.error("Lỗi khi cấp quyền Admin");
    }
  };

  const blockUser = async () => {
    if (!selectedUser) return;
    try {
      await axios.patch(`http://localhost:8000/api/users/${selectedUser.id}`, {
        isLocked: true, // Set user as locked
      });
      setListUser((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, isLocked: true } : user
        )
      );
      localStorage.removeItem("access_token");
      toast.success("Chặn người dùng thành công");
      closeModal();
    } catch (error) {
      toast.error("Lỗi khi chặn người dùng");
      console.error(error);
    }
  };

  const unBlockUser = async () => {
    if (!selectedUser) return;
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/users/${selectedUser.id}`,
        {
          isLocked: false, // Set user as unlocked
        }
      );
      if (response.status === 200) {
        setListUser((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, isLocked: false } : user
          )
        );
        toast.success("Mở chặn người dùng thành công");
        closeModal();
      }
    } catch (error) {
      toast.error("Lỗi khi mở chặn người dùng");
      console.error(error);
    }
  };

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
              <tr
                key={user.id}
                className={`hover:bg-gray-100 transition-colors ${
                  user.isLocked ? "opacity-50" : ""
                }`}
              >
                <td className="py-4 px-4">{user.id}</td>
                <td className="py-4 px-4">{user.name}</td>
                <td className="py-4 px-4">{user.phone_number}</td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-4 px-4">{user.address}</td>
                <td className="py-4 px-4 font-medium text-red-500 text-center">
                  {user.type}
                </td>
                <td className="py-4 px-4">{user.created_at}</td>
                <td className="py-4 px-4">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors"
                    onClick={() => openModal(user)}
                  >
                    Tùy chọn
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for managing user roles */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
            <p className="mb-4">Người dùng: {selectedUser.name}</p>
            <div className="space-y-2">
              {selectedUser.isLocked ? (
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
                  onClick={unBlockUser}
                >
                  Mở chặn người dùng
                </button>
              ) : (
                <>
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 w-full"
                    onClick={upgradeToAdmin}
                  >
                    Cấp quyền Admin
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
                    onClick={blockUser}
                  >
                    Chặn người dùng
                  </button>
                </>
              )}
            </div>
            <button
              className="mt-4 text-gray-700 py-1 px-4 border-[2px] rounded hover:bg-gray-200"
              onClick={closeModal}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ListUser;
