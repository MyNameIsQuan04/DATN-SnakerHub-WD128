import axios from "axios";
import React, { useEffect, useState } from "react";
import { Order } from "../../../interfaces/Order";

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Đổi tên state thành orders để rõ ràng hơn

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/orders");
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header với phần tìm kiếm, đặt cố định */}
      <div className="sticky top-0 bg-white z-10 p-4">
        {" "}
        {/* Đặt phần này cố định */}
        <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Email...."
            className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 md:w-1/3 lg:w-1/4"
          />
        </div>
      </div>

      {/* Table - Nội dung có thể cuộn */}
      <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
        {" "}
        {/* Đặt chiều cao tối đa và cho phép cuộn */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Họ và tên</th>
              <th className="py-2 px-4 border-b">Số điện thoại</th>
              <th className="py-2 px-4 border-b">Địa chỉ</th>
              <th className="py-2 px-4 border-b">Chi tiết sản phẩm</th>
              <th className="py-2 px-4 border-b">Tổng tiền</th>
              <th className="py-2 px-4 border-b">Trạng thái</th>
              <th className="py-2 px-4 border-b">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item: Order) => (
              <tr key={item.id} className="hover:bg-gray-100 cursor-pointer">
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.customer.name}</td>
                <td className="py-2 px-4 border-b">
                  {item.customer.phone_number}
                </td>
                <td className="py-2 px-4 border-b">{item.customer.address}</td>
                <td className="py-2 px-4 border-b">
                  {item.order_items.map((product) => (
                    <div key={product.id}>
                      Sản phẩm ID: {product.product__variant_id}, Số lượng:{" "}
                      {product.quantity}, Giá: {product.price} VND
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">{item.total_price} VND</td>
                <td className="py-2 px-4 border-b">{item.status}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Xử lý
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;
