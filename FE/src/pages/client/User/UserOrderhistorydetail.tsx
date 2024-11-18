import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Order } from '../../../interfaces/Order';

const UserOrderhistorydetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [orderDetail, setOrderDetail] = useState<Order | null>(null); // Trạng thái chi tiết đơn hàng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  // Hàm gọi API để lấy chi tiết đơn hàng
  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Order>(`http://localhost:8000/api/client/orders/${id}`);
      setOrderDetail(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Gọi hàm fetchOrderDetail khi component được mount
  useEffect(() => {
    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  // Xử lý trường hợp đang tải hoặc lỗi
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <h1>Chi tiết đơn hàng</h1>
      {orderDetail ? (
        <div>
          <p><strong>ID Đơn Hàng:</strong> {orderDetail.id}</p>
          <p><strong>Khách Hàng:</strong> {orderDetail.customer.name}</p>
          <p><strong>Số Điện Thoại:</strong> {orderDetail.customer.phone_number}</p>
          <p><strong>Địa Chỉ:</strong> {orderDetail.customer.address}</p>
          <p><strong>Trạng Thái:</strong> {orderDetail.status}</p>
          <p><strong>Ngày Tạo:</strong> {new Date(orderDetail.created_at).toLocaleDateString()}</p>
          <p><strong>Tổng Giá Trị:</strong> {orderDetail.total_price} VNĐ</p>
          <h2>Danh Sách Sản Phẩm:</h2>
          <ul>
            {orderDetail.order_items.map((item) => (
              <li key={item.id}>
                <p><strong>Tên Biến Thể Sản Phẩm:</strong> {item.product_variant.name}</p>
                <p><strong>Số Lượng:</strong> {item.quantity}</p>
                <p><strong>Giá:</strong> {item.price} VNĐ</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Không tìm thấy thông tin đơn hàng.</div>
      )}
    </div>
  );
};

export default UserOrderhistorydetail;