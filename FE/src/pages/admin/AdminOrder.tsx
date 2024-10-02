import React from "react";

const AdminOrder = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Email...."
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 md:w-1/3 lg:w-1/4"
        />
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Họ và tên</th>
            <th className="py-2 px-4 border-b">Số điện thoại</th>
            <th className="py-2 px-4 border-b">Địa chỉ</th>
            <th className="py-2 px-4 border-b">Chi tiết sản phẩm</th>
            <th className="py-2 px-4 border-b">Tổng tiền</th>
            <th className="py-2 px-4 border-b">Trạng thái</th>
            <th className="py-2 px-4 border-b">Hoạt động</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default AdminOrder;
