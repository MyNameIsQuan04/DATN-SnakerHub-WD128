import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Order } from "../../../interfaces/Order";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const OrderReturn = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filtered = data.filter(
        (order: Order) =>
          order.status === "Yêu cầu trả hàng" ||
          order.status === "Xử lý yêu cầu trả hàng"
      );
      setOrders(filtered);
      setFilteredOrders(filtered);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Không thể tải đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = orders.filter((order) =>
      [order.order_code, order.customer?.name, order.customer?.phone_number]
        .filter(Boolean)
        .some((field) =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 bg-white shadow-lg z-10 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Yêu cầu khiếu nại
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3 transition duration-300 focus:ring-2 focus:ring-yellow-500"
          />
          <Link to={`/admin/order`}>
            <button className="mt-4 md:mt-0 px-4 py-2 rounded-md border text-sm bg-gray-500 text-white border-gray-500 hover:bg-gray-600 transition duration-200">
              Danh sách đơn hàng
            </button>
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-[60vh]">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <span className="ml-2 text-lg font-medium text-gray-600">
            Đang tải đơn hàng khiếu nại ....
          </span>
        </div>
      )}

      {!isLoading && filteredOrders.length === 0 && (
        <div className="mt-4 text-center text-red-500 font-semibold">
          Không có đơn hàng phù hợp.
        </div>
      )}

      {filteredOrders.length > 0 && (
        <div className="overflow-y-auto mt-4" style={{ maxHeight: "540px" }}>
          <table className="min-w-full bg-white border border-gray-100 shadow-md">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-center">
                {[
                  "Mã đơn hàng",
                  "Thông tin",
                  "Tổng tiền",
                  "Phương thức thanh toán",
                  "Trạng thái",
                  "Chi tiết",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-2 px-5 border border-gray-300 font-semibold text-gray-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-4 border-b text-center text-blue-500">
                    #{order.order_code}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <p className="text-red-500">{order.customer?.name}</p>
                    <p>{order.customer?.phone_number}</p>
                  </td>
                  <td className="py-3 px-4 border-b text-center text-red-500 font-medium">
                    {order.totalAfterDiscount.toLocaleString()} VNĐ
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {order.paymentMethod === "COD" ? (
                      <span className="text-yellow-500 font-bold">COD</span>
                    ) : order.paymentMethod === "VNPAY" ? (
                      <img
                        src="https://i.imgur.com/RAtc2Se.png"
                        alt="VNPay"
                        className="inline-block w-10 h-10 object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 font-semibold">Khác</span>
                    )}
                  </td>
                  <td
                    className={`py-3 px-4 border-b text-center font-semibold ${
                      {
                        "Chờ xử lý": "text-yellow-500",
                        "Đã xác nhận": "text-yellow-500",
                        "Đã hủy": "text-red-500",
                        "Hoàn thành": "text-green-500",
                        "Đang vận chuyển": "text-orange-500",
                        "Trả hàng": "text-orange-500",
                      }[order.status] || "text-gray-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="border-b text-center">
                    <Link to={`/admin/order-detail/${order.id}`}>
                      <button className="text-white bg-gray-400 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-500 focus:outline-none underline">
                        Chi tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default OrderReturn;

// {item.status === "Yêu cầu trả hàng" && (
//   <tr>
//     <td colSpan={9} className="py-6 px-6 border-b bg-gray-50">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
//         <div>
//           <h1 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
//             Yêu cầu trả hàng:
//           </h1>
//           <h2 className="text-sm text-gray-600">
//             - {item.note}
//           </h2>
//         </div>
//         <div>
//           <button
//             className="mr-3 mt-4 md:mt-0 px-4 py-2 rounded-md border text-sm bg-white text-gray-500 border-gray-500 hover:bg-gray-300 hover:gray-green-600 transition duration-200"
//             onClick={() => handleUpdateReturn(item.id)}
//           >
//             Hủy yêu cầu
//           </button>
//           <button
//             className="mt-4 md:mt-0 px-4 py-2 rounded-md border text-sm bg-gray-500 text-white border-gray-500 hover:bg-gray-600 hover:gray-green-600 transition duration-200"
//             onClick={() => handleConfirmReturn(item.id)}
//           >
//             Xác nhận yêu cầu
//           </button>
//         </div>
//       </div>
//     </td>
//   </tr>
// )}
// {item.status === "Xử lý yêu cầu trả hàng" && (
//   <tr>
//     <td colSpan={9} className="py-6 px-6 border-b bg-white">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
//         <div>
//           <h1 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
//             Cập nhật trạng thái:
//           </h1>
//         </div>
//         <div>
//           <select
//             className="px-4 py-2 rounded-md border text-sm bg-white text-yellow-500 border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 hover:border-yellow-500 shadow-md transition duration-200"
//             onChange={(e) =>
//               handleStatusUpdate(item.id, e.target.value)
//             }
//             value={item.status}
//           >
//             <option value="Xử lý yêu cầu trả hàng">
//               Xử lý yêu cầu trả hàng
//             </option>
//             <option value="Trả hàng">Trả hàng</option>
//           </select>
//         </div>
//       </div>
//     </td>
//   </tr>
// )}
