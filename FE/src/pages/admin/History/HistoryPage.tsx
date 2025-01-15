import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { History } from "../../../interfaces/History";

const HistoryPage: React.FC = () => {
  const [histories, setHistories] = useState<History[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchHistories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/history");
      setHistories(response.data);
    } catch (error) {
      toast.error("Failed to fetch histories");
    }
  };

  const filterHistories = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/history-filter",
        {
          start_date: startDate,
          end_date: endDate,
        }
      );
      setHistories(response.data);
    } catch (error) {
      toast.error("Failed to filter histories");
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const parseJsonData = (data: string) => {
    try {
      return JSON.stringify(JSON.parse(data), null, 2);
    } catch {
      return data;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Lịch sử hoạt động
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-4 justify-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày kết thúc
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <button
          onClick={filterHistories}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tìm kiếm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Tên bảng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Record_id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Hành động
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Dữ liệu cũ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Dữ liệu mới
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Ngày tạo mới thay đổi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Ngày thay đổi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {histories.map((history) => (
              <tr key={history.id}>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {history.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {history.user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {history.table_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {history.record_id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {history.action}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {history.old_data}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-pre-wrap">
                  {parseJsonData(history.new_data)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(history.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(history.updated_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default HistoryPage;
