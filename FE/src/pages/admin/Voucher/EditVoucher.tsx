import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast

const EditVoucher: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const [codeDiscount, setCodeDiscount] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [type, setType] = useState<"percent" | "amount">("percent");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [usageLimit, setUsageLimit] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Hàm lấy voucher từ API
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/voucher/${id}`
        );
        const voucher = response.data.voucher;
        setCodeDiscount(voucher.codeDiscount);
        setDiscount(voucher.discount);
        setType(voucher.type);
        setExpirationDate(voucher.expiration_date);
        setUsageLimit(voucher.usage_limit);
      } catch (err: any) {
        setError("Không thể tải dữ liệu voucher");
      } finally {
        setLoading(false);
      }
    };

    fetchVoucher();
  }, [id]);

  // Hàm xử lý submit form để cập nhật voucher
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const voucherData = {
      codeDiscount,
      discount,
      type,
      expiration_date: expirationDate,
      usage_limit: usageLimit,
    };

    try {
      // Gửi request PUT đến API Laravel của bạn để cập nhật voucher
      await axios.put(`http://localhost:8000/api/voucher/${id}`, voucherData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Hiển thị thông báo thành công bằng toast
      toast.success("Voucher đã được cập nhật thành công");
      navigate("/admin/vouchers"); // Chuyển hướng về trang danh sách voucher
    } catch (error: any) {
      // Hiển thị thông báo lỗi bằng toast
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật voucher"
      );
    }
  };

  if (loading) return <p className="text-center py-4">Đang tải...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa Voucher</h2>
      {error && <p className="text-red-500">{error}</p>}

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
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Cập nhật Voucher
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default EditVoucher;
