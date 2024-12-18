import { useEffect, useState, memo } from "react";
import axios from "axios";
import { IUser } from "../../../interfaces/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoHomeOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { FaSpinner } from "react-icons/fa";
import { format } from "date-fns"; // Import date-fns

const ListUser = () => {
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching users
  const [isUpdating, setIsUpdating] = useState(false); // Loading state for modal actions

  const token = localStorage.getItem("access_token");

  // Fetch user list
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setListUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Unable to fetch the user list. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = (user: IUser) => {
    if (user.type === "user") {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      toast.info("This user is already an Admin.");
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
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/users/${selectedUser.id}`,
        updatedData,{
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
      toast.error("An error occurred while updating the user.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const upgradeToAdmin = () =>
    handleUserUpdate({ type: "admin" }, "User has been upgraded to Admin!");
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
            user.id === selectedUser.id ? { ...user, isLocked: true } : user
          )
        );
        toast.success("User has been blocked!");
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
            user.id === selectedUser.id ? { ...user, isLocked: false } : user
          )
        );
        toast.success("User has been unblocked!");
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
        <h2 className="font-bold text-3xl">User List</h2>
        <div className="flex items-center gap-2 ml-2 text-gray-600">
          <div className="flex items-center gap-1">
            <IoHomeOutline />
            <GrFormNext />
          </div>
          <h3 className="underline">User Management</h3>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Loading users...
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
                  <th className="p-4 text-left">Quyền truy cập</th>
                </tr>
              </thead>
              <tbody>
                {listUser.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || "https://via.placeholder.com/150"}
                          alt="Avatar"
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="font-semibold text-gray-800">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{user.phone_number}</td>
                    <td className="p-4">{user.address || "N/A"}</td>
                    <td className="p-4 text-red-500">{user.email}</td>
                    <td className="p-4">
                      {user.created_at
                        ? format(new Date(user.created_at), "dd/MM/yyyy HH:mm")
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openModal(user)}
                        className={`px-2 py-1 rounded-md font-semibold ${
                          user.type === "admin"
                            ? "text-green-600 border border-green-600"
                            : "text-orange-600 border border-orange-600"
                        }`}
                      >
                        {user.type === "admin" ? "Admin" : "User"}
                      </button>
                    </td>
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
              Manage User: {selectedUser.name}
            </h2>
            <div className="space-y-4">
              {selectedUser.isLocked ? (
                <button
                  className="w-full py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
                  onClick={unBlockUser}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Processing..." : "Unblock User"}
                </button>
              ) : (
                <>
                  <button
                    className="w-full py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md"
                    onClick={upgradeToAdmin}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Processing..." : "Promote to Admin"}
                  </button>
                  <button
                    className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                    onClick={blockUser}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Processing..." : "Block User"}
                  </button>
                </>
              )}
              <button
                className="w-full py-2 text-gray-700 border border-gray-400 hover:bg-gray-200 rounded-md"
                onClick={closeModal}
              >
                Cancel
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
