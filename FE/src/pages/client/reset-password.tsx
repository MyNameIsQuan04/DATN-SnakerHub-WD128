import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}
const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // Thay vì useHistory
  const { register, handleSubmit } = useForm<ResetPasswordForm>();
  useEffect(() => {
    // Lấy token và email từ URL
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    const emailFromUrl = params.get("email");

    if (!tokenFromUrl || !emailFromUrl) {
      setErrorMessage("Liên kết đặt lại mật khẩu không hợp lệ.");
      return;
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  }, [location]);

  const handleResetPassword = async (data: ResetPasswordForm) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password",
        {
          token,
          email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        }
      );

      alert("Mật khẩu đã được thay đổi thành công");
      navigate("/login"); // Điều hướng về trang đăng nhập
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error ||
          "Đặt lại mật khẩu không thành công. Vui lòng thử lại."
      );
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Thay đổi mật khẩu
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset passwod
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
