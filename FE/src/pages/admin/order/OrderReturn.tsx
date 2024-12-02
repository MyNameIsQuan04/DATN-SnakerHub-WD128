import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Order } from "../../../interfaces/Order";
import { Link } from "react-router-dom";

const OrderReturn = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
    //   const loadingToast = toast.loading("Đang tải dữ liệu...");
      const { data } = await axios.get("http://localhost:8000/api/orders");
      const filtered = data.filter(
        (order: Order) => order.status === "Yêu cầu trả hàng"
      );
      setOrders(filtered);
      setFilteredOrders(filtered);
    //   toast.update(loadingToast, {
    //     // render: "Tải dữ liệu thành công!",
    //     type: "success",
    //     isLoading: false,
    //     autoClose: false,
    //   });
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Không thể tải danh sách đơn hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = orders.filter((order) =>
      [order.order_code, order.customer?.name, order.customer?.phone_number]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleConfirmReturn = async (orderId: number) => {
    try {
      const loadingToast = toast.loading("Đang xử lý yêu cầu...");
      await axios.patch(`http://localhost:8000/api/orders/${orderId}`, {
        status: "Trả hàng",
      });

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );

      toast.update(loadingToast, {
        render: "Xác nhận trả hàng thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi xác nhận trả hàng:", error);
      toast.error("Xác nhận trả hàng thất bại. Vui lòng thử lại.");
    }
  };
  const handleUpdateReturn = async (orderId: number) => {
    try {
      const loadingToast = toast.loading("Đang xử lý yêu cầu...");
      await axios.patch(`http://localhost:8000/api/orders/${orderId}`, {
        status: "Đã giao hàng",
      });

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );

      toast.update(loadingToast, {
        render: "Hủy yêu cầu khiếu nại thành công ",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi xác nhận hủy yêu cầu:", error);
      toast.error("Xác nhận hủy yêu cầu thất bại. Vui lòng thử lại.");
    }
  };

  const toggleExpandOrder = (orderId: number) => {
    setExpandedOrderId((prevOrderId) =>
      prevOrderId === orderId ? null : orderId
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 bg-white shadow-lg z-10 p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Yêu cầu khiếu nại
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full md:w-1/2 lg:w-1/3 transition duration-300 focus:ring-2 focus:ring-yellow-500"
          />
          <Link to={`/admin/order`}>
            <button className="mt-4 md:mt-0 px-4 py-2 rounded-md border text-sm bg-gray-500 text-white border-gray-500 hover:bg-gray-600 hover:gray-green-600 transition duration-200">
              Danh sách đơn hàng
            </button>
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 text-center text-blue-500 font-semibold">
          Đang tải dữ liệu...
        </div>
      )}

      {!isLoading && filteredOrders.length === 0 && (
        <div className="mt-4 text-center text-red-500 font-semibold">
          Không có đơn hàng phù hợp.
        </div>
      )}

      {!isLoading && filteredOrders.length > 0 && (
        <div className="overflow-y-auto mt-4" style={{ maxHeight: "540px" }}>
          <table className="min-w-full bg-white border border-gray-100 shadow-md">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-center">
                {[
                  "Mã đơn hàng",
                  "Họ và tên",
                  "Thông tin",
                  "Ngày tạo",
                  "Tổng tiền",
                  "Chi tiết",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-2 px-3 border border-gray-300 font-semibold text-gray-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((item: Order) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-200 cursor-pointer transition duration-200 ease-in-out">
                    <td className="py-3 px-4 border-b text-center">
                      <span className="mr-1">#</span>
                      <span>{item.order_code}</span>
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {item.customer.name}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <span>{item.customer.phone_number}</span> ,{" "}
                      {item.customer.address}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      {item.created_at}
                    </td>
                    <td className="py-3 px-4 border-b text-center text-red-500 font-bold">
                      {item.total_price.toLocaleString()} VNĐ
                    </td>
                    <td className="border-b text-center">
                      <button
                        className="text-gray-500 bg-white w-20 h-8 rounded-md border-2 border-gray-500 transition duration-200 ease-in-out 
                        hover:bg-gray-200 hover:border-gray-400 focus:outline-none"
                        onClick={() => toggleExpandOrder(item.id)}
                      >
                        {expandedOrderId === item.id ? "Ẩn" : "Chi tiết"}
                      </button>
                    </td>
                  </tr>
                  {item.status === "Yêu cầu trả hàng" && (
                    <tr>
                      <td colSpan={9} className="py-6 px-6 border-b bg-gray-50">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                          <div>
                            <h1 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
                              Yêu cầu trả hàng:
                            </h1>
                            <h2 className="text-sm text-gray-600">
                              - {item.note}
                            </h2>
                          </div>
                          <div>
                            <button
                              className="mr-3 mt-4 md:mt-0 px-4 py-2 rounded-md border text-sm bg-white text-gray-500 border-gray-500 hover:bg-gray-300 hover:gray-green-600 transition duration-200"
                              onClick={() => handleUpdateReturn(item.id)}
                            >
                              Hủy yêu cầu
                            </button>
                            <button
                              className="mt-4 md:mt-0 px-4 py-2 rounded-md border text-sm bg-gray-500 text-white border-gray-500 hover:bg-gray-600 hover:gray-green-600 transition duration-200"
                              onClick={() => handleConfirmReturn(item.id)}
                            >
                              Xác nhận yêu cầu
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {expandedOrderId === item.id && (
                    <tr>
                      <td colSpan={9} className="py-4 px-4 border-b">
                        <h2 className="mb-2 font-medium">Chi tiết đơn hàng:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.order_items.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
                            >
                              <img
                                src={product.product_variant?.image || ""}
                                alt="Product"
                                className="w-24 h-24 object-cover mr-4 rounded-md"
                              />
                              <div className="flex-grow">
                                <div className="font-semibold text-lg">
                                  <strong>Sản phẩm:</strong>{" "}
                                  {product.product_variant?.product?.name ||
                                    "N/A"}
                                </div>
                                <div className="text-gray-700">
                                  <strong>Số lượng:</strong> {product.quantity}
                                </div>
                                <div className="text-gray-700">
                                  <strong>Giá:</strong>{" "}
                                  <span className="text-red-500 font-medium">
                                    {product.price.toLocaleString()}
                                  </span>{" "}
                                  VNĐ
                                </div>
                                <div className="text-gray-700">
                                  <strong>Mã sản phẩm:</strong>{" "}
                                  {product.product_variant?.sku || "N/A"}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
