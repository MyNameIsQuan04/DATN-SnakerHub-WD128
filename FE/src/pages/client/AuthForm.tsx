import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/User";
import { useAuth } from "../../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../../schemas/authSchema";
import instance from "../../apis/api";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const nav = useNavigate();
  const { login: contextLogin } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IUser>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: IUser) => {
    try {
      if (isLogin) {
        const res = await instance.post(`/login`, data);
        contextLogin(res.data.accessToken, res.data.user);
        toast.success("Đăng nhập thành công!");
        nav("/");
      } else {
        await instance.post(`/register`, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        nav("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? "Đăng Nhập" : "Đăng Ký"}
        </h1>

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Tên
            </label>
            <input
              type="text"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("name", { required: "Thông tin bắt buộc!!!" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("email", { required: "Thông tin bắt buộc!!!" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("phone", { required: "Thông tin bắt buộc!!!" })}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>
        )}

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("address", { required: "Thông tin bắt buộc!!!" })}
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </span>
            )}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("password", { required: "Thông tin bắt buộc!!!" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Xác Nhận Mật Khẩu
            </label>
            <input
              type="password"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("confirmPassword", {
                required: "Thông tin bắt buộc!!!",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </button>
          {isLogin && (
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          )}
        </div>

        <div className="mt-4">
          {isLogin ? (
            <Link
              to="/register"
              className="text-sm text-blue-500 hover:underline"
            >
              Bạn chưa có tài khoản, chuyển sang đăng ký?
            </Link>
          ) : (
            <Link to="/login" className="text-sm text-blue-500 hover:underline">
              Bạn đã có tài khoản, chuyển sang đăng nhập?
            </Link>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
