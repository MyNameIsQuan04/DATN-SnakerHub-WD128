import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { ColorCT } from "../../../contexts/ColorContext";
import { Color } from "../../../interfaces/Color";
import { getColorById } from "../../../services/admin/color";
import { ToastContainer } from "react-toastify";

const UpdateColor = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Color>();
  const params = useParams();
  useEffect(() => {
    (async () => {
      const category = await getColorById(params?.id as number | string);
      reset({
        name: category.name,
      });
    })();
  }, []);
  const { onUpdateColor } = useContext(ColorCT);
  const onSubmit = async (data: Color) => {
    onUpdateColor(data, params?.id as number | string);
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Sửa màu sắc</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên sản phẩm */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Tên kích cỡ
            </label>
            <input
              {...register("name", {
                required: "Không được để trống",
              })}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên danh mục"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Sửa màu sắc
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
      <ToastContainer />
    </div>
  );
};

export default UpdateColor;
