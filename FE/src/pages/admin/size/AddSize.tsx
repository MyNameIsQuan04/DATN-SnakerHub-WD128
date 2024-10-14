import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const AddSize = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    try {
      const data = await axios.post("http://localhost:8000/api/categories");
      alert("Thanh cong");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Thêm kích thước</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên sản phẩm */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Tên kích thước
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên sản phẩm"
              {...register("name")}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Thêm kích thước
          </button>
          <Link to="/admin/size">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            >
              Quay lại
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddSize;
