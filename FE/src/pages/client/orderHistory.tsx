import { useEffect, useState } from "react";
import axios from "axios";
import { Color } from "../../interfaces/Color";
import { Size } from "../../interfaces/Size";

interface ProductVariant {
  id: number;
  product_id: number;
  color: Color;
  size: Size;
  sku: string;
  price: number;
  stock: number;
  image: string;
}

interface OrderItem {
  id: number;
  order_id: number;
  product__variant_id: number;
  quantity: number;
  price: number;
  product_variant: ProductVariant;
}

interface Customer {
  user_id: number;
  id: number;
  name: string;
  phone_number: string;
  address: string;
}

interface Order {
  id: number;
  created_at: string;
  total_price: number;
  status: string;
  customer: Customer;
  order_items: OrderItem[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/client/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="mt-[50px] px-[150px]">
      <h1>Lịch sử đơn hàng</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-3 my-3">
          <p>Ngày tạo: {new Date(order.created_at).toLocaleDateString()}</p>
          <p>Khách hàng: {order.customer.name}</p>
          <p>Địa chỉ: {order.customer.address}</p>
          <p>Số điện thoại: {order.customer.phone_number}</p>
          <p>Tổng tiền: {order.total_price} đ</p>
          <p>Trạng thái: {order.status}</p>
          <div className="mt-3">
            <h3>Chi tiết sản phẩm:</h3>
            {order.order_items.map((item) => (
              <div key={item.id} className="border-b p-2 flex gap-3">
                <img
                  src={item.product_variant.image}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="object-cover"
                />
                <div>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Giá: {item.price} đ</p>
                  <p>Giá sản phẩm: {item.product_variant.price} đ</p>
                  <p>Màu sắc: {item.product_variant.color.name}</p>
                  <p>Kích thước: {item.product_variant.size.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
