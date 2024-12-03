import React from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../configs/axios";
import axios from "axios";
import { object } from "zod";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = localStorage.getItem("access_token");
  const status =
    queryParams.get("vnp_ResponseCode") === "00" ? "thành công" : "thất bại";

  const paymentStatus = async () => {
    try {
      // Tạo payload với chuỗi query từ dấu ? trở đi
      const queryString = location.search.substring(1); // Bỏ dấu ?

      await axios.get("http://localhost:8000/api/vnpay-return", {
        params: { query: queryString }, // Đặt query string vào params
        headers: {
          Authorization: `Bearer ${token}`, // Đặt token vào headers
        },
      });

      console.log("Request thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi request:", error);
    }
  };

  // Gọi hàm paymentStatus khi cần

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
        <h1 className="text-3xl font-bold text-orange-600">
          Bạn đã thanh toán {status} !
        </h1>
        <p className="mt-4 text-lg text-orange-600">
          Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
        </p>
        <p
          onClick={() => paymentStatus()}
          className="mt-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          Xác nhận
        </p>
      </div>
    </div>
  );
};

export default PaymentResult;
