import React, { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../../../interfaces/User";

const UserInfor = () => {
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

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "avatar" && files && files.length > 0) {
      const file = files[0];
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(profile); // Log dữ liệu để kiểm tra
    if (token) {
      axios
        .put("http://localhost:8000/api/profile", profile, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Thông tin đã được cập nhật thành công!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      alert("Vui lòng đăng nhập để cập nhật thông tin.");
    }
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
          {/* Left side: Name, Email, Phone Number, Gender */}
          <div className="space-y-6">
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

            {/* Phone Number and Birthday inline */}
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

            {/* Gender (Moved below Phone Number) */}
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

          {/* Right side: Profile Picture Upload, Address */}
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  className="rounded-full w-32 h-32 object-cover shadow-lg border-4 border-white hover:border-blue-500"
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt="Profile"
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
              <p className="text-sm text-gray-500 mt-2">
                Dung lượng file tối đa 1 MB
              </p>
              {/* <p className="text-sm text-gray-500">Định dạng: .JPEG, .PNG</p> */}
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

          {/* Save Button */}
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
    </div>
  );
};

export default UserInfor;
