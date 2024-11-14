import React, { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../../../interfaces/User";
import { useAuth } from "../../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInfor = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    gender: "other",
    birthday: "",
    address: "",
    avatar: "",
    created_at: "",
    isLocked: false,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (user && token) {
      setLoading(true); // Bật loading khi bắt đầu tải dữ liệu
      axios
        .get(`http://localhost:8000/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setProfile(response.data);
          setLoading(false); // Tắt loading khi nhận được dữ liệu
        })
        .catch((error) => {
          console.error("Lỗi lấy dữ liệu hồ sơ:", error);
          toast.error("Không thể lấy thông tin hồ sơ, vui lòng thử lại sau.");
          setLoading(false); // Tắt loading khi có lỗi
        });
    }
  }, [user, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "avatar" && files && files.length > 0) {
      const file = files[0];
      if (file.size > 1048576) {
        toast.success("Dung lượng file tối đa là 1MB.");
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (token && user) {
      setLoading(true); // Bật loading khi bắt đầu cập nhật dữ liệu
      const formData = new FormData();
      formData.append("name", profile.name || "");
      formData.append("email", profile.email || "");
      formData.append("phone_number", profile.phone_number || "");
      formData.append("gender", profile.gender || "other");
      formData.append("birthday", profile.birthday || "");
      formData.append("address", profile.address || "");

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      try {
        // Gửi yêu cầu PUT đến server
        const response = await axios.post(
          `http://localhost:8000/api/users/${user.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Thông tin đã được cập nhật thành công!");
          setProfile(response.data);
        } else {
          throw new Error(
            "Cập nhật không thành công, mã lỗi: " + response.status
          );
        }
      } catch (error) {
        console.error("Lỗi cập nhật hồ sơ:", error);
        toast.error("Có lỗi xảy ra khi cập nhật hồ sơ.");
      } finally {
        setLoading(false); // Tắt loading sau khi hoàn thành
      }
    } else {
      toast.success("Vui lòng đăng nhập để cập nhật thông tin.");
    }
  };

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 max-w-7xl mx-auto">
      <section>
        <p className="text-lg text-gray-600 mb-3 font-medium">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white"
        >
          <div className="space-y-6">
            {/* Các trường thông tin người dùng */}
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-2"
                htmlFor="name"
              >
                Tên người dùng
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name || ""}
                onChange={handleChange}
                placeholder="Nhập tên"
                className="w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email || ""}
                onChange={handleChange}
                placeholder="Nhập email"
                className="w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  className="text-lg font-semibold text-gray-700 mb-2"
                  htmlFor="phone_number"
                >
                  Số điện thoại
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  value={profile.phone_number || ""}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold text-gray-700 mb-2">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={profile.birthday || ""}
                  onChange={handleChange}
                  className="w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                Giới tính
              </label>
              <div className="flex items-center gap-6">
                {["male", "female", "other"].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center text-gray-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={profile.gender === gender}
                      onChange={handleChange}
                      className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <span className="ml-2 text-base font-medium">
                      {gender === "male"
                        ? "Nam"
                        : gender === "female"
                        ? "Nữ"
                        : "Khác"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white hover:border-blue-500 cursor-pointer"
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt="Profile"
                  onClick={handleAvatarClick}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                accept="image/jpeg, image/png"
                className="block w-full text-dark cursor-pointer rounded-md py-3 px-6 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-2"
                htmlFor="address"
              >
                Địa chỉ
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={profile.address || ""}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
                className="w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
              />
            </div>
          </div>

          <div className="mt-10 col-span-2">
            <button
              type="submit"
              className="w-full md:w-96 px-8 py-3 text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-lg hover:shadow-2xl focus:shadow-2xl font-bold text-lg transition duration-300 transform hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
            >
              Lưu
            </button>
          </div>
        </form>
      </section>

      {/* Hiển thị loading spinner nếu đang tải dữ liệu */}
      {loading && (
        <div className="fixed inset-0  flex justify-center items-center z-50">
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 text-base font-semibold text-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 "
          disabled={loading}
        >
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"
            role="status"
          />
          <span>Loading...</span>
        </button>
      </div>
      
      )}

      {/* Modal hiển thị ảnh avatar*/}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              className="w-96 h-96 object-cover shadow-lg rounded-none"
              src={profile.avatar || "https://via.placeholder.com/150"}
              alt="Avatar Enlarged"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-600 rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}
      <ToastContainer className="mt-[80px]" />
    </div>
  );
};

export default UserInfor;
