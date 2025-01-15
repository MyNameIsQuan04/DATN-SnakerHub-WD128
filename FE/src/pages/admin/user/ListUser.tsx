import { useEffect, useState, memo } from "react";
import axios from "axios";
import { IUser } from "../../../interfaces/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { FaSpinner } from "react-icons/fa";
import { format } from "date-fns"; // Import date-fns
import { useAuth } from "../../../contexts/AuthContext";

const ListUser = () => {
  const { user } = useAuth();
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching users
  const [isUpdating, setIsUpdating] = useState(false); // Loading state for modal actions
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");

  // Fetch user list
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred while fetching user data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const openModal = (user: IUser) => {
    if (user.role_id === 1) {
      toast.info("Người dùng này đã là Quản trị.");
    } else {
      setSelectedUser(user);
      setIsModalOpen(true);
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

    // Kiểm tra giá trị role_id hợp lệ trước khi gửi
    if (updatedData.role_id && ![1, 2].includes(updatedData.role_id)) {
      toast.error("Role ID không hợp lệ. Vui lòng chọn quyền hợp lệ.");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/users/${selectedUser.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      console.error(error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const errorMessage =
          error.response.data.errors.role_id?.[0] || "An error occurred.";
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred while updating the user.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const upgradeToAdmin = () =>
    handleUserUpdate({ role_id: 1 }, "Người dùng này đã là Quản trị!");

  const upgradeToSaler = () =>
    handleUserUpdate({ role_id: 2 }, "Người dùng này đã là Nhân viên!");

  const blockUser = async () => {
    if (!selectedUser) return;
    setIsUpdating(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/${selectedUser.id}/lock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setListUser((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, deleted_at: new Date().toISOString() }
              : user
          )
        );
        toast.success("User đã bị chặn!");
        closeModal();
      }
    } catch (error) {
      toast.error("An error occurred while blocking the user.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const unBlockUser = async () => {
    if (!selectedUser) return;
    if (selectedUser.deleted_at === null) {
      toast.info("Người dùng đã bị chặn.");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/${selectedUser.id}/unlock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setListUser((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, deleted_at: null } : user
          )
        );
        toast.success("Người dùng đã được bỏ chặn!");
        closeModal();
      }
    } catch (error) {
      toast.error("An error occurred while unblocking the user.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="font-bold text-3xl">Danh sách người dùng</h2>
        <div className="flex items-center gap-2 ml-2 text-gray-600">
          <div className="flex items-center gap-1">
            <IoHomeOutline />
            <GrFormNext />
          </div>
          <h3 className="underline">Danh sách</h3>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Đang tải người dùng...
          </span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[60vh] text-red-500 text-lg font-semibold">
          <span className="ml-2 text-lg font-medium text-gray-600">
            Tải thông tin người dùng thất bại...
          </span>
        </div>
      ) : (
        <>
          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="p-4 text-left">Tên người dùng</th>
                  <th className="p-4 text-left">Số điện thoại</th>
                  <th className="p-4 text-left">Địa chỉ</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Ngày tạo</th>
                  {user?.role_id === 1 && (
                    <th className="p-4 text-left">Quyền truy cập</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {listUser.map((usermap) => (
                  <tr
                    key={usermap.id}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            usermap.avatar || "https://via.placeholder.com/150"
                          }
                          alt="Avatar"
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="font-semibold text-gray-800">
                          {usermap.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{usermap.phone_number}</td>
                    <td className="p-4">{usermap.address || "N/A"}</td>
                    <td className="p-4 text-red-500">{usermap.email}</td>
                    <td className="p-4">
                      {usermap.created_at
                        ? format(
                            new Date(usermap.created_at),
                            "dd/MM/yyyy HH:mm"
                          )
                        : "N/A"}
                    </td>
                    {user?.role_id === 1 && (
                      <td className="p-4">
                        <button
                          onClick={() => openModal(usermap)}
                          className={`px-2 py-1 rounded-md font-semibold ${
                            usermap.role_id === 1
                              ? "text-red-600 border border-red-600"
                              : usermap.role_id === 2
                              ? "text-blue-600 border border-blue-600"
                              : "text-orange-600 border border-orange-600"
                          }`}
                        >
                          {(usermap.role_id === 1 && "Quản trị") ||
                            (usermap.role_id === 2 && "Nhân viên") ||
                            "Người dùng"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Quyền truy cập: {selectedUser.name}
            </h2>
            <div className="space-y-4">
              {/* Kiểm tra nếu delete_at là null, người dùng chưa bị chặn */}
              {selectedUser.deleted_at === null ? (
                <>
                  <button
                    className="w-full py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md"
                    onClick={upgradeToAdmin}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Đang tải..." : "Cấp quyền Quản trị"}
                  </button>

                  <button
                    className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                    onClick={upgradeToSaler}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Đang tải..." : "Cấp quyền Nhân viên"}
                  </button>

                  <button
                    className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                    onClick={blockUser}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Đang tải..." : "Chặn người dùng"}
                  </button>
                </>
              ) : (
                // Nếu delete_at có giá trị, người dùng bị chặn
                <button
                  className="w-full py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
                  onClick={unBlockUser}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Đang tải..." : "Mở chặn người dùng"}
                </button>
              )}
              <button
                className="w-full py-2 text-gray-700 border border-gray-400 hover:bg-gray-200 rounded-md"
                onClick={closeModal}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default memo(ListUser);