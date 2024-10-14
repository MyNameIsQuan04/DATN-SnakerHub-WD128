import React from "react";
import { Link } from "react-router-dom";

const AddColor = () => {
  return (
    <div>
<<<<<<< HEAD
        <div className="container mx-auto p-4">
=======
      <div className="container mx-auto p-4">
>>>>>>> 472d62847e120970495637adb9755c2fcd541538
        <h1 className="text-3xl font-semibold mb-6">Thêm màu sắc</h1>
        <form>
          {/* Tên sản phẩm */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Tên kích cỡ
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên danh mục"
            />
          </div>

<<<<<<< HEAD
          
=======
>>>>>>> 472d62847e120970495637adb9755c2fcd541538
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
<<<<<<< HEAD
            Thêm màu sắc 
          </button>
          <Link to="/admin/color">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
          >
            Quay lại  
          </button>
=======
            Thêm màu sắc
          </button>
          <Link to="/admin/color">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
            >
              Quay lại
            </button>
>>>>>>> 472d62847e120970495637adb9755c2fcd541538
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
