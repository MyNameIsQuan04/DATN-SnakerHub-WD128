import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddVoucher: React.FC = () => {
  const [codeDiscount, setCodeDiscount] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [type, setType] = useState<"percent" | "amount">("percent");
  const [startDate, setStartDate] = useState<string>(""); // Thêm state cho start_date
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [usageLimit, setUsageLimit] = useState<number>(1);
  const navigate = useNavigate();

  // Lấy ngày hôm nay theo định dạng yyyy-MM-dd
  const today = new Date().toISOString().split("T")[0];

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra giá trị giảm giá không vượt quá 50%
    if (type === "percent" && discount > 50) {
      toast.error("Giảm giá không được vượt quá 50%");
      return;
    }

    // Kiểm tra ngày bắt đầu và ngày hết hạn
    if (startDate > expirationDate) {
      toast.error("Ngày bắt đầu không được sau ngày hết hạn");
      return;
    }

    const voucherData = {
      codeDiscount,
      discount,
      type,
      start_date: startDate,
      expiration_date: expirationDate,
      usage_limit: usageLimit,
    };

    try {
      // Gửi request POST đến API Laravel
      await axios.post("http://localhost:8000/api/voucher", voucherData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Tạo voucher mới thành công");
      navigate("/admin/vouchers");
    } catch (error: any) {
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
            onChange={(e) => setType(e.target.value as "percent")}
            className="w-full border p-2"
            required
          >
            <option value="percent">Phần trăm</option>
          </select>
        </div>
        <div>
          <label className="block">Ngày bắt đầu</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border p-2"
            min={today} // Disable các ngày trước ngày hôm nay
            required
          />
        </div>
        <div>
          <label className="block">Ngày hết hạn</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full border p-2"
            min={today} // Disable các ngày trước ngày hôm nay
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
