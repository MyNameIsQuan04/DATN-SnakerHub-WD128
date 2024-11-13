import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State quản lý ẩn/hiện mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State quản lý ẩn/hiện mật khẩu xác nhận
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ResetPasswordForm>();

  useEffect(() => {
    // Lấy token và email từ URL
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    const emailFromUrl = params.get("email");

    if (!tokenFromUrl || !emailFromUrl) {
      setErrorMessage("Liên kết đặt lại mật khẩu không hợp lệ.");
      toast.error("Liên kết đặt lại mật khẩu không hợp lệ.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  }, [location]);

  const handleResetPassword = async (data: ResetPasswordForm) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp");
      toast.error("Mật khẩu xác nhận không khớp", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/reset-password", {
        token,
        email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      toast.success("Mật khẩu đã được thay đổi thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      const message =
        error.response?.data?.error ||
        "Đặt lại mật khẩu không thành công. Vui lòng thử lại.";
      setErrorMessage(message);
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Thay đổi mật khẩu
        </h2>

        {errorMessage && (
          <p className="mb-4 text-red-500 text-center">{errorMessage}</p>
        )}

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="space-y-6"
        >
          {/* Mật khẩu mới */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Điều chỉnh type theo trạng thái
                placeholder="Nhập mật khẩu mới"
                {...register("password")}
                className="w-full mt-2 p-3 border rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái showPassword
              >
                {showPassword ? "Ẩn" : "Hiện"} {/* Thay đổi icon hoặc text */}
              </button>
            </div>
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Điều chỉnh type theo trạng thái
                placeholder="Xác nhận mật khẩu"
                {...register("confirmPassword")}
                className="w-full mt-2 p-3 border rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Thay đổi trạng thái showConfirmPassword
              >
                {showConfirmPassword ? "Ẩn" : "Hiện"}{" "}
                {/* Thay đổi icon hoặc text */}
              </button>
            </div>
          </div>

          {/* Nút đặt lại mật khẩu */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-700 text-white font-medium py-3 rounded-md transition duration-300"
          >
            Đặt lại mật khẩu
          </button>
        </form>
      </div>

      {/* React Toastify */}
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
