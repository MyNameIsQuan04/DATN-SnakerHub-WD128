import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast
import { Link } from "react-router-dom";

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

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Danh sách mã giảm giá
      </h2>
      <div className="text-left">
        <Link
          to="/admin/voucher-add"
          className="bg-blue-500 text-white p-3 rounded-lg text-xl hover:bg-blue-600 transition"
        >
          Tạo mã giảm giá
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="text-left bg-gray-100 text-gray-700">
            <th className="py-3 px-6 border-b">Mã</th>
            <th className="py-3 px-6 border-b">Tỉ lệ giảm giá</th>
            <th className="py-3 px-6 border-b">Ngày hết hạn</th>
            <th className="py-3 px-6 border-b">Số lần sử dụng</th>
            <th className="py-3 px-6 border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.id} className="hover:bg-gray-50">
              <td className="py-4 px-6 border-b text-gray-600">
                {voucher.codeDiscount}
              </td>
              <td className="py-4 px-6 border-b text-gray-600">
                {voucher.discount}%
              </td>
              <td className="py-4 px-6 border-b text-gray-600">
                {voucher.expiration_date}
              </td>
              <td className="py-4 px-6 border-b text-gray-600">
                {voucher.usage_limit}
              </td>
              <td className="py-4 px-6 border-b text-red-500">
                <div className="flex space-x-2">
                  {/* Button sửa */}
                  {/* <Link
                    to={`/admin/voucher-edit/${voucher.id}`}
                    className="bg-yellow-500 text-white font-semibold rounded py-1 px-3 text-base hover:bg-yellow-600 transition"
                  >
                    Sửa
                  </Link> */}
                  {/* Button xóa */}
                  <button
                    onClick={() => handleDelete(voucher.id)}
                    className="bg-red-500 text-white font-semibold rounded py-1 px-3 text-base hover:bg-red-600 transition"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default ListVoucher;
