import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {};

const ForgotPassword = (props: Props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:8000/api/forget-password", data);
      alert("Thanh cong");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
        <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Quên mật khẩu
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Bạn nhớ mật khẩu?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="/login"
                >
                  Đăng nhập ở đây
                </a>
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Địa chỉ Email của bạn
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        {...register("email")}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Lấy lại mật khẩu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
