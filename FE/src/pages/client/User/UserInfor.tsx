import React from "react";

const UserInfor = () => {
  return (
    <div>
      {/* Main Profile Section */}
      {/* profile-section w-full md:w-2/3 lg:w-3/4 p-6 sm:p-10 bg-white shadow rounded mx-auto */}
      <section className="">
        <h1 className="text-3xl font-bold mb-6">Hồ Sơ Của Tôi</h1>
        <p className="text-lg text-muted mb-6">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
        <form className="form bg-white p-6 rounded shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username Field */}
            <div>
              <label
                className="block text-lg font-semibold text-dark mb-2"
                htmlFor="username"
              >
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                value="hulongnguyen774"
                disabled
                className="form-control bg-light text-muted"
              />
              <p className="text-sm text-muted mt-1">
                Tên Đăng nhập chỉ có thể thay đổi một lần.
              </p>
            </div>

            {/* Full Name Field */}
            <div>
              <label
                className="block text-lg font-semibold text-dark mb-2"
                htmlFor="full-name"
              >
                Tên
              </label>
              <input
                id="full-name"
                type="text"
                placeholder="Nhập tên"
                className="form-control"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-lg font-semibold text-dark mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex">
                <input
                  id="email"
                  type="text"
                  value="ln*****@gmail.com"
                  disabled
                  className="form-control bg-light text-muted"
                />
                <button className="btn bg-primary text-white ml-2">
                  Thay Đổi
                </button>
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                className="block text-lg font-semibold text-dark mb-2"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <div className="flex">
                <input
                  id="phone"
                  type="text"
                  value="*******15"
                  disabled
                  className="form-control bg-light text-muted"
                />
                <button className="btn bg-primary text-white ml-2">
                  Thay Đổi
                </button>
              </div>
            </div>

            {/* Gender Field */}
            <div>
              <label className="block text-lg font-semibold text-dark mb-2">
                Giới tính
              </label>
              <div className="flex items-center gap-4">
                {["Nam", "Nữ", "Khác"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      className="form-radio text-primary"
                    />
                    <span className="ml-2 font-medium">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block text-lg font-semibold text-dark mb-2">
                Ngày sinh
              </label>
              <div className="grid grid-cols-3 gap-3">
                <select className="form-control">
                  <option>4</option>
                </select>
                <select className="form-control">
                  <option>Tháng 11</option>
                </select>
                <select className="form-control">
                  <option>2024</option>
                </select>
              </div>
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div className="mt-8 flex items-center">
            <div className="mr-6">
              <img
                className="rounded-full w-28 h-28 object-cover"
                src="https://via.placeholder.com/150"
                alt="Profile Picture"
              />
            </div>
            <div>
              <button className="btn bg-light text-dark">Chọn Ảnh</button>
              <p className="text-sm text-muted mt-1">
                Dung lượng file tối đa 1 MB
              </p>
              <p className="text-sm text-muted">Định dạng: .JPEG, .PNG</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-auto px-8 py-3 text-white font-bold text-lg"
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
