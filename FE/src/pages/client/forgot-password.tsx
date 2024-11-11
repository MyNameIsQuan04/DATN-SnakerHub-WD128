import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      await axios.post("http://localhost:8000/api/forget-password", data);

      alert("Vui lòng kiểm tra mail của bạn");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-12 mt-10">
      <div className="flex shadow-md">
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: "24rem", height: "auto" }}
        >
          <div className="w-72">
            <h1 className="text-xl font-semibold">Forgot Password</h1>
            <small className="text-gray-400">
              Please enter your email to reset your password
            </small>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="mb-1.5 block w-full text-center text-white bg-black hover:bg-gray-700  px-2 py-1.5 rounded-md"
                >
                  Reset Password
                </button>
              </div>
            </form>

            {/* Link to Login Page */}
            <div className="text-center">
              <a
                href="/login"
                className="text-xs font-semibold text-purple-700"
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>

        {/* Banner Section */}
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
  );
};

export default ForgotPassword;
