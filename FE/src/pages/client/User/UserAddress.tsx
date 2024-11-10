import React, { useState } from 'react';

const UserAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    detailedAddress: '',
    addressType: '',
    isDefault: false,
  });

  // Mở và đóng modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked, // Cập nhật giá trị của checkbox
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Cập nhật giá trị của các input khác
      });
    }
  };

  // Lưu địa chỉ
  const handleSave = () => {
    console.log('Địa chỉ đã được lưu:', formData);
    closeModal(); // Đóng modal sau khi lưu
  };

  return (
    <div className="relative">
      <section>
        <h1 className="text-3xl font-bold mb-6">Địa Chỉ Của Tôi</h1>
        <form className="bg-white p-6 rounded shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Các trường thông tin địa chỉ */}
          </div>
          <button type="submit" className="btn btn-primary mt-6">
            Lưu Địa Chỉ
          </button>
        </form>
      </section>

      {/* Nút thêm địa chỉ và đóng modal */}
      <div className="absolute top-0 right-0 mt-4 mr-4 flex gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          onClick={openModal}
        >
          Thêm Địa Chỉ
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-24">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-auto relative">
            {/* Thêm Địa Chỉ title */}
            <h2 className="text-2xl font-bold mb-4 sticky top-0 left-0 pt-4 pl-4 bg-white z-10">
              Thêm Địa Chỉ
            </h2>
            
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Họ tên và Số điện thoại trên cùng một hàng */}
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="col-span-1">
                  <label htmlFor="fullName" className="block text-gray-700">Họ Tên</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label htmlFor="phoneNumber" className="block text-gray-700">Số Điện Thoại</label>
                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                  />
                </div>
              </div>

              {/* Địa chỉ (Tỉnh/Quận/Huyện/Xã) */}
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700">Địa Chỉ (Tỉnh, Quận, Xã)</label>
                <select
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                >
                  <option value="">Chọn địa chỉ</option>
                  <option value="Hanoi-DongDa-Phuong1">Hà Nội - Đống Đa - Phường 1</option>
                  <option value="HCM-ThuDuc-Phuong2">Hồ Chí Minh - Thủ Đức - Phường 2</option>
                </select>
              </div>

              {/* Địa chỉ chi tiết */}
              <div className="mb-4">
                <label htmlFor="detailedAddress" className="block text-gray-700">Địa Chỉ Chi Tiết</label>
                <input
                  id="detailedAddress"
                  type="text"
                  name="detailedAddress"
                  value={formData.detailedAddress}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
              </div>

              {/* Bản đồ (Chưa tích hợp, chỉ là placeholder) */}
              <div className="mb-4">
                <label htmlFor="map" className="block text-gray-700">Chọn địa chỉ trên bản đồ</label>
                <div className="h-40 bg-gray-200 rounded mt-2 flex justify-center items-center">
                  <p>Map Placeholder</p>
                </div>
              </div>

              {/* Loại địa chỉ */}
              <div className="mb-4">
                <label htmlFor="addressType" className="block text-gray-700">Loại Địa Chỉ</label>
                <select
                  id="addressType"
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                >
                  <option value="">Chọn loại địa chỉ</option>
                  <option value="Home">Nhà Riêng</option>
                  <option value="Office">Văn Phòng</option>
                </select>
              </div>

              {/* Đặt làm địa chỉ mặc định */}
              <div className="mb-4">
                <label htmlFor="isDefault" className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Đặt làm địa chỉ mặc định
                </label>
              </div>

              {/* Nút Lưu và Đóng */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Lưu Địa Chỉ
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAddress;
