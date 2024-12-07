import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ColorCT } from "../../../contexts/ColorContext";
import { Color } from "../../../interfaces/Color";

const AddColor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Color>();
  const { onAddColor } = useContext(ColorCT);
  const onSubmit = async (data: Color) => {
    onAddColor(data);
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Thêm màu sắc</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên sản phẩm */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Tên màu
            </label>
            <input
              {...register("name", {
                required: "Không được để trống",
              })}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên màu sắc"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Thêm màu sắc
          </button>
          <Link to="/admin/color">
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

export default AddColor;
