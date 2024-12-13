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
        const res = await instance.post(`/auth/login`, data);
        contextLogin(res.data.access_token, res.data.user);
        toast.success("Đăng nhập thành công!");
        nav("/");
        window.location.reload();
      } else {
        await instance.post(`/auth/register`, {
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          address: data.address,
          password: data.password,
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
    <>
      {/* Container */}
      <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-12 mt-[80px]">
        <div className="flex shadow-md">
          <div
            className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
            style={{ width: "24rem", height: "auto" }}
          >
            <div className="w-72">
              <h1 className="text-xl font-semibold">
                {isLogin ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
              </h1>

              {/* Form */}
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field (Only for register) */}
                {!isLogin && (
                  <div className="mb-3">
                    <label className="mb-2 block text-xs font-semibold">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên của bạn"
                      className="block w-full rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black py-1 px-1.5 text-gray-500"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Email Field */}
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    className="block w-full rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black py-1 px-1.5 text-gray-500"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number Field (Only for register) */}
                {!isLogin && (
                  <div className="mb-3">
                    <label className="mb-2 block text-xs font-semibold">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className="block w-full rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black py-1 px-1.5 text-gray-500"
                      {...register("phone_number")}
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Address Field (Only for register) */}
                {!isLogin && (
                  <div className="mb-3">
                    <label className="mb-2 block text-xs font-semibold">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ"
                      className="block w-full rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black py-1 px-1.5 text-gray-500"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Password Field */}
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    placeholder="*****"
                    className="block w-full rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black py-1 px-1.5 text-gray-500"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me checkbox */}

                {/* Submit button */}
                {isLogin && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                )}
                <div className="mb-3">
                  <button
                    type="submit"
                    className="mb-1.5 block w-full text-center text-white bg-black hover:bg-gray-700 px-2 py-1.5 rounded-md"
                  >
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="text-center">
                <span className="text-xs text-gray-400 font-semibold">
                  Không có tài khoản?
                </span>
                <Link
                  to={isLogin ? "/register" : "/login"}
                  className="text-xs font-semibold text-black"
                >
                  {isLogin ? "Đăng ký" : "Đăng nhập"}
                </Link>
              </div>
            </div>
          </div>

          {/* Login banner */}
          <div
            className="flex flex-wrap content-center justify-center rounded-r-md"
            style={{ width: "38rem", height: "40rem" }}
          >
            <img
              className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
              src="https://i.pinimg.com/564x/07/2a/ce/072acedc4dbb223b7bf635f42aa0fe83.jpg"
              alt="Login banner"
            />
          </div>
        </div>
      </div>

      <ToastContainer className="mt-[90px]" />
    </>
  );
};

export default AuthForm;
