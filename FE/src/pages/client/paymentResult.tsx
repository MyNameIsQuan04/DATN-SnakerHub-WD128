import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status =
    queryParams.get("vnp_ResponseCode") === "00" ? "thành công" : "thất bại";
  const paymentStatus = () => {
    try {
    } catch (error) {}
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
        <h1 className="text-3xl font-bold text-orange-600">
          Bạn đã thanh toán {status} !
        </h1>
        <p className="mt-4 text-lg text-orange-600">
          Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
        </p>
        <Link
          to="/profile/order-history"
          className="mt-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          Xác nhận
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
