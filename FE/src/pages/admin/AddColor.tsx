import React from 'react'
import { Link } from 'react-router-dom'


const AddColor = () => {
  return (
<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-auto">
      <div className="bg-white w-full max-w-3xl mx-auto p-8 rounded-lg shadow-lg relative overflow-y-auto max-h-screen">
        {/* Tiêu đề Thêm Danh Mục Cố Định */}
        <h1 className="text-3xl font-semibold mb-6 sticky top-0 bg-white py-4 z-20 border-b border-gray-300">
          Thêm kích cỡ
        </h1>

        <form className="p-4">
          {/* Tên danh mục */}
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

          {/* Nút thêm danh mục */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Thêm kích cỡ
            </button>

            <Link to="/admin/category">
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Quay lại
              </button>
            </Link>
          </div>
        </form>

        {/* Nút đóng modal */}
        <Link to="/admin/size">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AddColor