import React from 'react';
import { Link } from 'react-router-dom';

const UserAnnouncement = () => {
  return (
    <div>
      <div className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        {/* Flash Sale Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-5">Flash Sale!</h2>
        <p className="text-lg text-gray-600 mb-10">Hurry! Limited Time Offer.</p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-5 mb-10">
          <div className="bg-red-600 text-white py-2 px-4 rounded-full text-lg">
            <span>01</span> Hours
          </div>
          <div className="bg-red-600 text-white py-2 px-4 rounded-full text-lg">
            <span>15</span> Minutes
          </div>
          <div className="bg-red-600 text-white py-2 px-4 rounded-full text-lg">
            <span>43</span> Seconds
          </div>
        </div>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative">
            <img
              src=""
             
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">product.name</h3>
            <div className="flex items-center space-x-4 mb-5">
              <p className="text-xl text-red-600 font-bold">product.salePrice₫</p>
              <p className="text-lg text-gray-500 line-through">product.originalPrice₫</p>
            </div>

            {/* Product Description */}
            <p className="text-gray-700 mb-6">product.description</p>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <Link
                to={`/cart`}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Add to Cart
              </Link>
              <Link
                to={`/checkout`}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserAnnouncement;
