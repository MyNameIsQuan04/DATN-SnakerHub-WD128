import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/vnpay/create",
        { amount: parseInt(amount, 10) } // Đảm bảo amount là số nguyên
      );
      const paymentUrl = response.data.paymentUrl;
      window.location.href = paymentUrl; // Chuyển hướng tới VNPay
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="mt-[500px]">
      <h2>Thanh toán VNPay</h2>
      <input
        type="number"
        placeholder="Nhập số tiền"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Thanh toán</button>
    </div>
  );
};

export default PaymentForm;
