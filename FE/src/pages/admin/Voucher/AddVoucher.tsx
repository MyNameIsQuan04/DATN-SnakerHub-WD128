import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast
import { useNavigate } from "react-router-dom";

const AddVoucher: React.FC = () => {
  const [codeDiscount, setCodeDiscount] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [type, setType] = useState<"percent" | "amount">("percent");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [usageLimit, setUsageLimit] = useState<number>(1);
  const navigate = useNavigate();

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(codeDiscount);

    const voucherData = {
      codeDiscount,
      discount,
      type,
      expiration_date: expirationDate,
      usage_limit: usageLimit,
    };

    try {
      // Gửi request POST đến API Laravel của bạn
      await axios.post("http://localhost:8000/api/voucher", voucherData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Hiển thị thông báo thành công bằng toast
      toast.success("Tạo voucher mới thành công");
      navigate("/admin/vouchers");
    } catch (error: any) {
      // Hiển thị thông báo lỗi bằng toast
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Thêm Voucher</h2>

      {/* Form nhập thông tin voucher */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Mã giảm giá</label>
          <input
            type="text"
            value={codeDiscount}
            onChange={(e) => setCodeDiscount(e.target.value)}
            className="w-full border p-2"
            maxLength={10}
            placeholder="Tối đa 10 ký tự"
            required
          />
        </div>
        <div>
          <label className="block">Giảm giá</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full border p-2"
            required
            min={1}
            max={100}
          />
        </div>
        <div>
          <label className="block">Loại giảm giá</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "percent" | "amount")}
            className="w-full border p-2"
            required
          >
            <option value="percent">Phần trăm</option>
            <option value="amount">Số tiền</option>
          </select>
        </div>
        <div>
          <label className="block">Ngày hết hạn</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full border p-2"
            placeholder="yyyy-mm-dd"
            required
          />
        </div>
        <div>
          <label className="block">Giới hạn sử dụng</label>
          <input
            type="number"
            value={usageLimit}
            onChange={(e) => setUsageLimit(Number(e.target.value))}
            className="w-full border p-2"
            required
            min={1}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Thêm Voucher
        </button>
      </form>

      {/* Toast container */}
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddVoucher;
