import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateAdmin: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook

  if (isAdmin) {
    return <>{element}</>;
  }

  const handleBackToHome = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-red-600">
          Bạn không có quyền truy cập
        </h1>
        <p className="text-gray-600 mb-8">
          Bạn không có quyền truy cập vào trang này.
        </p>
        <button
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none transition duration-300"
          onClick={handleBackToHome} // Call function on click
        >
          Trở về trang Home
        </button>
      </div>
    </div>
  );
};

export default PrivateAdmin;
