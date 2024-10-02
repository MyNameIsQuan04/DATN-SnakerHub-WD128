import React from 'react'
import { Link } from 'react-router-dom'


const AddSize = () => {
  return (
    <div>
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6">Thêm kích thước</h1>
        <form>
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
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Nhập tên sản phẩm"
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
  )
}

export default AddSize