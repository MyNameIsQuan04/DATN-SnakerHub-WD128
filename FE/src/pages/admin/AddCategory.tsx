import React from 'react'
import { Link } from 'react-router-dom'



const AddCategory = () => {
  return (
    <div>
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Thêm danh mục </h1>
        <form>
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
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên sản phẩm"
            />
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
  )
}

export default AddCategory