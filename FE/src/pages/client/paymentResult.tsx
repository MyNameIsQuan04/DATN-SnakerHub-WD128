import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const status =
    queryParams.get("vnp_ResponseCode") === "00" ? "thành công" : "thất bại";

  const paymentStatus = async () => {
    try {
      // Tạo payload với chuỗi query từ dấu ? trở đi
      const queryString = location.search.substring(1); // Bỏ dấu ?

      await axios.get(`http://localhost:8000/api/vnpay-return?${queryString}`, {
        params: { query: queryString }, // Đặt query string vào params
        headers: {
          Authorization: `Bearer ${token}`, // Đặt token vào headers
        },
      });
      navigate("/thankyou");
      console.log("Request thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi request:", error);
    }
  };

  // Gọi hàm paymentStatus khi vnp_ResponseCode === "00"
  useEffect(() => {
    if (queryParams.get("vnp_ResponseCode") === "00") {
      paymentStatus();
    }
  }, [queryParams]); // Chạy lại khi queryParams thay đổi

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
        <h1 className="text-3xl font-bold text-orange-600">
          Bạn đã thanh toán {status}!
        </h1>
        <p className="mt-4 text-lg text-orange-600">
          Vui lòng chờ xử lý đơn hàng
        </p>
      </div>
    </div>
  );
};

export default PaymentResult;
