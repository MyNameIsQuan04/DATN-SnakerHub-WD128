import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-center text-white">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Trang không tìm thấy</h2>
        <p className="mb-8">
          Xin lỗi, trang bạn tìm không tồn tại hoặc đã bị xóa.
        </p>
        <button
          className="px-6 py-3 text-lg font-medium bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none transition duration-300"
          onClick={handleBackToHome}
        >
          Trở về trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFound;
