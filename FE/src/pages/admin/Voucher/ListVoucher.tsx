import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast
import { Link } from "react-router-dom";
import "./VoucherCss.css";

const ListVoucher = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/vouchers");
        setVouchers(response.data.vouchers);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch vouchers");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn chắc chắn muốn xóa mã giảm giá này?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/voucher/${id}`);
        setVouchers(vouchers.filter((voucher) => voucher.id !== id)); // Cập nhật lại danh sách voucher sau khi xóa
        toast.success("Xóa Voucher thành công!"); // Thông báo thành công
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Xóa Voucher thất bại"); // Thông báo lỗi
      }
    }
  };

  // Kiểm tra xem voucher có hết hạn không
  const isExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Danh sách mã giảm giá
      </h2>
      <div className="text-left mb-6">
        <Link
          to="/admin/voucher-add"
          className="bg-blue-500 text-white p-3 rounded-lg text-xl hover:bg-blue-600 transition"
        >
          Tạo mã giảm giá
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((voucher) => (
          <div
            key={voucher.id}
            className={`voucher-card bg-white border border-gray-200 rounded-lg shadow-lg p-6 relative hover:transform hover:-translate-y-1 hover:border-orange-400 transition-all ${
              isExpired(voucher.expiration_date) ? "bg-red-100" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-blue-600">
                {voucher.codeDiscount}
              </h3>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  isExpired(voucher.expiration_date)
                    ? "bg-gray-500 text-white"
                    : "bg-red-100 text-red-500"
                }`}
              >
                Giảm {voucher.discount}%
              </span>
            </div>
            <p className="text-gray-600">
              Ngày bắt đầu:{" "}
              <span className="font-medium">{voucher.start_date}</span>
            </p>
            <p className="text-gray-600">
              Ngày hết hạn:{" "}
              <span className="font-medium">{voucher.expiration_date}</span>
            </p>
            <p className="text-gray-600">
              Số lần sử dụng:{" "}
              <span className="font-medium">{voucher.usage_limit}</span>
            </p>
            <div className="absolute top-0 right-0 bg-gray-100 rounded-tl-lg py-1 px-3 text-sm font-bold text-gray-700">
              ID: {voucher.id}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              {/* Button sửa */}
              <Link
                to={`/admin/voucher-edit/${voucher.id}`}
                className="bg-yellow-500 text-white font-semibold rounded py-1 px-3 text-base hover:bg-yellow-600 transition"
              >
                Sửa
              </Link>
              {/* Button xóa */}
              <button
                onClick={() => handleDelete(voucher.id)}
                className="bg-red-500 text-white font-semibold rounded py-1 px-3 text-base hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default ListVoucher;
