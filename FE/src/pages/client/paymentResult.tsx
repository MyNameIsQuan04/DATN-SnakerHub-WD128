import React from "react";
import { useLocation } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status =
    queryParams.get("vnp_ResponseCode") === "00" ? "Thành công" : "Thất bại";

  return (
    <div>
      <h2>Kết quả thanh toán</h2>
      <p>Trạng thái: {status}</p>
    </div>
  );
};

export default PaymentResult;
