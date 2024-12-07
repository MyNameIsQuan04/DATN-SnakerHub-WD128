/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Order } from "../../../interfaces/Order";
import { FcPrevious } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetailHictory = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/orders/${id}`
      );
      setOrder(data);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Không thể tải chi tiết đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (order?.status === newStatus) {
      return; // Nếu trạng thái hiện tại giống với trạng thái mới, không làm gì cả
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/orders/${id}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        setOrder({ ...order, status: newStatus }); // Cập nhật trạng thái mới cho đơn hàng
        toast.success("Cập nhật trạng thái thành công!");
      }
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">Đang tải chi tiết đơn hàng...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!order) {
    return (
      <div className="text-center text-red-500 mt-4">
        Không tìm thấy đơn hàng.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng: #{order.order_code}</h1>
      <div className="mb-4">
        <Link
          to="/admin/order"
          className="flex items-center text-blue-500 hover:underline"
        >
          <FcPrevious /> Quay lại danh sách đơn hàng
        </Link>
      </div>

      <div className="p-4">
        {order.order_items.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-wrap md:flex-nowrap border-b py-4 items-center"
          >
            {/* Phần ảnh sản phẩm */}
            <div className="w-full md:w-1/4 flex justify-center h-60">
              <img
                src={item.product_variant?.image || ""}
                alt={item.product_variant?.product?.name || "Sản phẩm"}
                className="object-contain h-full w-full rounded-md"
              />
            </div>

            {/* Phần thông tin sản phẩm */}
            <div className="w-full md:w-3/4 md:pl-6">
              <h2 className="text-lg font-semibold">
                {item.product_variant?.product?.name || "Tên sản phẩm không có"}
              </h2>
              <p className="text-gray-700 italic">
                <strong>Mô tả:</strong>{" "}
                {item.product_variant?.product?.description ||
                  "Không có mô tả."}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p>
                  <strong>Số lượng:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Đơn giá:</strong>{" "}
                  <span className="text-red-500 font-bold">
                    {item.price.toLocaleString()} VNĐ
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-2/3 p-4 mt-2 border-b-2">
          <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Họ và tên:</strong> {order.customer.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.customer.phone_number}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.customer.address}
            </p>
            <p>
              <strong>Email:</strong> {order.customer.user.email || "Không có email"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-2/3 p-4 mt-2">
          <h2 className="text-xl font-semibold mb-2">Thông tin đơn hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Trạng thái: </strong> 
              <span
                className={`${
                  order.status === "Hoàn thành" ? "text-gray-500" : "text-yellow-500"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              <span className="text-red-500 font-bold">
                {order.total_price.toLocaleString()} VNĐ
              </span>
            </p>
          </div>
          {order.status !== "Hoàn thành" && (
            <div className="mt-4 flex items-center gap-2">
              <h3 className="text-lg font-semibold">Cập nhật trạng thái: </h3>
              <select
                value={order.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="border px-4 py-2 rounded-md mt-2"
              >
                <option value="Chờ xử lý">Chờ xử lý</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
                <option value="Trả hàng">Trả hàng</option>
              </select>
            </div>
          )}
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default OrderDetailHictory;
