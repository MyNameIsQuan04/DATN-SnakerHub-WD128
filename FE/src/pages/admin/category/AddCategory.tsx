<<<<<<< HEAD

=======
>>>>>>> 472d62847e120970495637adb9755c2fcd541538
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { CategoryCT } from "../../../contexts/CategoryContext";
import { formDataCategory } from "../../../interfaces/Category";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataCategory>();
  const { onAddCategory } = useContext(CategoryCT);
  const onSubmit = async (data: formDataCategory) => {
    onAddCategory(data);
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Thêm danh mục</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên sản phẩm */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Tên danh mục
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên danh mục"
              {...register("name", {
                required: "Không được để trống",
                minLength: {
                  value: 3,
                  message: "Tên danh mục phải lớn hơn 3 kí tự",
                },
              })}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Thêm danh mục
          </button>
          <Link to="/admin/category">
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

export default AddCategory;
