import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ColorCT } from "../../../contexts/ColorContext";
import { Color } from "../../../interfaces/Color";
import { toast } from "react-toastify"; // Để hiển thị thông báo

const AddColor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Color>();
  const { onAddColor } = useContext(ColorCT);
  const navigate = useNavigate();

  const onSubmit = async (data: Color) => {
    try {
      await onAddColor(data);
      toast.success("Thêm màu sắc thành công!");
      navigate("/admin/color"); // Điều hướng đến danh sách màu sau khi thêm
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm màu.");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Thêm màu sắc</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên màu sắc */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Tên màu sắc
            </label>
            <input
              {...register("name", {
                required: "Không được để trống",
              })}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên màu"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Thêm mới
          </button>
          {/* Nút quay lại không gửi form */}
          <Link to="/admin/color">
            <button
              type="button" // Thay 'submit' thành 'button'
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            >
              Quay lại
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
