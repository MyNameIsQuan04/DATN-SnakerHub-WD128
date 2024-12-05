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
        const response = await axios.get(`http://localhost:8000/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
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
    <div className="">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Danh sách người dùng
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 border-b border-gray-300">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="p-4 border-b border-gray-300">Thông tin</th>
              <th className="p-4 border-b border-gray-300">Email</th>
              <th className="p-4 border-b border-gray-300">Quyền truy cập</th>
              <th className="p-4 border-b border-gray-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-4 border-b border-gray-200">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-20 h-20 overflow-hidden">
                        <img
                          src={user.avatar || "https://via.placeholder.com/150"}
                          alt=""
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">
                        {user.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <span className="text-red-500 font-medium">{user.email}</span>
                  {/*<br />
                   <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span> */}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.created_at}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => openModal(user)}
                    className={`w-[100px] px-1 py-1 text-center text-sm font-semibold rounded-md transition-shadow duration-200 ${
                      user.type === "admin"
                        ? "text-green-600 bg-white border border-green-600 hover:shadow-lg"
                        : "text-orange-600 bg-white border border-orange-600 hover:shadow-lg"
                    }`}
                  >
                    {user.type === "admin" ? "Admin" : "User"}
                  </button>
                </td>

                <td className="p-4 border-b border-gray-200">
                  <button className="btn btn-ghost btn-xs text-blue-500 hover:text-blue-700">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal quản lí người dùng */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Quản lý người dùng
            </h2>
            <p className="mb-4 text-gray-600">
              Người dùng: {selectedUser.name}
            </p>
            <div className="space-y-2">
              {selectedUser.isLocked ? (
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full transition duration-200"
                  onClick={unBlockUser}
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : "Mở chặn người dùng"}
                </button>
              ) : (
                <>
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 w-full transition duration-200"
                    onClick={upgradeToAdmin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Cấp quyền Admin"}
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full transition duration-200"
                    onClick={blockUser}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Chặn người dùng"}
                  </button>
                </>
              )}
            </div>
            <button
              className="mt-4 text-gray-700 py-1 px-4 border-[2px] rounded hover:bg-gray-200 transition-colors w-full"
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
