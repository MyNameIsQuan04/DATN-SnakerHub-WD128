import { useEffect, useState, memo } from "react";
import axios from "axios";
import { IUser } from "../../../interfaces/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListUser = () => {
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users`);
        setListUser(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        toast.error("Không thể tải danh sách người dùng.");
      }
    };
    fetchData();
  }, []);

  const openModal = (user: IUser) => {
    if (user.type === "user") {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      toast.info("Người dùng đã là Admin.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = async (
    updatedData: Partial<IUser>,
    successMessage: string
  ) => {
    if (!selectedUser) return;
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/users/${selectedUser.id}`,
        updatedData
      );
      if (response.status === 200) {
        setListUser((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedData } : user
          )
        );
        toast.success(successMessage);
        closeModal();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật người dùng.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeToAdmin = () =>
    handleUserUpdate({ type: "admin" }, "Cấp quyền Admin thành công!");
  const blockUser = () =>
    handleUserUpdate({ isLocked: true }, "Chặn người dùng thành công!");
  const unBlockUser = () =>
    handleUserUpdate({ isLocked: false }, "Mở chặn người dùng thành công!");

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Danh sách người dùng
      </h1>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-300 text-gray-600 text-center">
              <th className="py-3 px-4 font-bold">STT</th>
              <th className="py-3 px-4 font-bold">Tên người dùng</th>
              <th className="py-3 px-4 font-bold">Số điện thoại</th>
              <th className="py-3 px-4 font-bold">Email</th>
              <th className="py-3 px-4 font-bold">Địa chỉ</th>
              <th className="py-3 px-4 font-bold">Quyền truy cập</th>
              <th className="py-3 px-4 font-bold">Ngày tạo</th>
              <th className="py-3 px-4 font-bold">Hành động</th>
            </tr>
          </thead>
        </table>

        {/* Nội dung cuộn */}
        <div className="max-h-[550px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody>
              {listUser.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer ${
                    user.isLocked ? "opacity-50" : ""
                  }`}
                >
                  <td className="py-4 px-4 text-center">{index + 1}</td>
                  <td className="py-4 px-4 text-blue-500 font-serif">
                    {user.name}
                  </td>
                  <td className="py-4 px-4 text-center">{user.phone_number}</td>
                  <td className="py-4 px-4 text-center">{user.email}</td>
                  <td className="py-4 px-4 text-center">{user.address}</td>
                  <td className="py-4 px-4 font-medium text-red-500 text-center">
                    {user.type}
                  </td>
                  <td className="py-4 px-4 text-center">{user.created_at}</td>
                  <td className="py-4 px-4 text-center">
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
      </div>

      {/* Modal quản lí người dùng */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
            <p className="mb-4">Người dùng: {selectedUser.name}</p>
            <div className="space-y-2">
              {selectedUser.isLocked ? (
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
                  onClick={unBlockUser}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : "Mở chặn người dùng"}
                </button>
              ) : (
                <>
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 w-full"
                    onClick={upgradeToAdmin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Cấp quyền Admin"}
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
                    onClick={blockUser}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Chặn người dùng"}
                  </button>
                </>
              )}
            </div>
            <button
              className="mt-4 text-gray-700 py-1 px-4 border-[2px] rounded hover:bg-gray-200 transition-colors"
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

export default memo(ListUser);
