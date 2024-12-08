import { useEffect, useState } from "react";
import axios from "axios";
import { CartItem } from "../../interfaces/Cart";
import { useNavigate } from "react-router-dom";
import api from "../../configs/axios";
import { toast, ToastContainer } from "react-toastify";
// import { Toaster } from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("access_token");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  if (!token) {
    toast.error("Hãy đăng nhập để sử dụng chức năng!");
    navigate("/login");
    return;
  }
  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const updateCartItemQuantity = async (id: number, quantity: number) => {
    try {
      await api.put(
        `update/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
      toast.error("Cập nhật số lượng thất bại");
    }
  };

  const handleIncrease = (index: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          const newQuantity = item.quantity + 1;
          if (newQuantity > item.product_variant.stock) {
            toast.error("Số lượng không thể vượt quá tồn kho");
            return item; // Không thay đổi gì
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleDecrease = (index: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const [errorMessages, setErrorMessages] = useState<{ [key: number]: string }>(
    {}
  );

  const handleQuantityChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value.trim();

    // Kiểm tra giá trị nhập vào

    const newQuantity = Number(inputValue);

    // Kiểm tra nếu giá trị không hợp lệ hoặc nhỏ hơn hoặc bằng 0
    if (newQuantity > cartItems[index].product_variant.stock) {
      setErrorMessages((prev) => ({
        ...prev,
        [index]: `Số lượng không thể vượt quá tồn kho: ${cartItems[index].product_variant.stock}`,
      }));
      return;
    }

    // Cập nhật số lượng và xóa lỗi nếu có
    setErrorMessages((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index]; // Xóa lỗi khi số lượng hợp lệ
      return newErrors;
    });
    // Kiểm tra nếu số lượng vượt quá tồn kho

    // Cập nhật số lượng nếu mọi điều kiện đều hợp lệ
    setCartItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalPriceItem = (price: number, quantity: number) => price * quantity;
  const handleRemoveItem = async (id: number) => {
    const confirm = window.confirm("Xóa sản phẩm khỏi giỏ hàng?");

    if (confirm) {
      try {
        await api.delete(`destroy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success("Xóa sản phẩm thành công");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        toast.error("Xóa sản phẩm thất bại");
      }
    }
  };

  const stockValidate = cartItems.map((item) => {
    const product = item.product_variant.product;
    const stock = item.product_variant.stock;
    const quantity = item.quantity;

    return {
      productName: product.name,
      stock: stock,
      quantity: quantity,
      disableIncrease: quantity >= stock,
    };
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true); // Bắt đầu loading khi fetch bắt đầu
        const response = await axios.get("http://localhost:8000/api/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success && response.data.cart?.cart__items) {
          setCartItems(response.data.cart.cart__items);
          setSelectedItems(
            response.data.cart.cart__items.map((item: CartItem) => item.id)
          );
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        setCartItems([]); // Đảm bảo giỏ hàng được đặt là mảng trống trong trường hợp lỗi
      } finally {
        setLoading(false); // Kết thúc loading sau khi fetch xong
      }
    };

    fetchCartItems();
  }, [token]);

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }

    // Kiểm tra nếu có sản phẩm nào có số lượng bằng 0 hoặc vượt quá số lượng tồn kho
    const invalidItems = cartItems.filter((item) => {
      const isSelected = selectedItems.includes(item.id);
      const isOutOfStock =
        item.quantity === 0 || item.quantity > item.product_variant.stock;
      return isSelected && isOutOfStock;
    });

    if (invalidItems.length > 0) {
      const invalidItemsNames = invalidItems
        .map((item) => {
          const quantity = item.quantity;
          const stock = item.product_variant.stock;
          // Thông báo lỗi nếu số lượng lớn hơn tồn kho
          if (quantity > stock) {
            return `${item.product_variant.product.name} (Số lượng: ${quantity}, Tồn kho: ${stock})`;
          }
          // Thông báo lỗi nếu số lượng bằng 0
          return `${item.product_variant.product.name} (Số lượng: ${quantity})`;
        })
        .join(", ");

      toast.error(`Số lượng sản phẩm không hợp lệ: ${invalidItemsNames}`);
      return;
    }

    try {
      // Lọc các sản phẩm được chọn
      const itemsToUpdate = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );

      await Promise.all(
        itemsToUpdate.map((item) =>
          updateCartItemQuantity(item.id, item.quantity)
        )
      );

      // Điều hướng đến trang checkout sau khi cập nhật thành công
      navigate("/checkout", { state: { selectedItems } });
      toast.success("Đã chuyển đến trang thanh toán");
    } catch (error) {
      toast.error("Cập nhật số lượng thất bại, vui lòng thử lại");
    }
  };

  // Hàm định dạng tiền tệ
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="px-[100px] text-center mt-[100px]">Giỏ hàng trống.</div>
    );
  }

  return (
    <section className="py-6 relative mt-16">
      <div className="w-full max-w-5xl px-3 md:px-4 lg:px-5 mx-auto">
        <h2 className="title font-manrope font-bold text-2xl leading-7 mb-4 text-center text-black">
          Giỏ hàng
        </h2>
        {loading && (
          <div className="text-center text-xl text-blue-500">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 text-base font-semibold text-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 disabled:opacity-70"
              disabled={loading}
            >
              <div
                className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"
                role="status"
              />
              <span>Loading...</span>
            </button>
          </div>
        )}
        {cartItems.map((item, index) => {
          const productVariant = item?.product_variant;
          const product = productVariant?.product;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 p-3 lg:p-4 grid grid-cols-12 mb-4 max-lg:max-w-md max-lg:mx-auto gap-y-3"
            >
              <div className="col-span-12 lg:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="max-lg:w-24 lg:w-28 rounded-lg object-cover"
                />
              </div>
              <div className="col-span-12 lg:col-span-10 w-full lg:pl-2">
                <div className="flex items-center justify-between w-full mb-2">
                  <h5 className="font-manrope font-bold text-lg leading-6 text-gray-900">
                    {product.name}
                  </h5>
                  <button
                    className="rounded-full group flex items-center justify-center focus-within:outline-none"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                        cx="14"
                        cy="14"
                        r="14"
                      />
                      <path
                        className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                        d="M11.834 10.799V9.793C11.834 9.12 12.391 8.566 13.064 8.566H14.936C15.609 8.566 16.166 9.12 16.166 9.793V10.799M16.166 10.799C16.166 10.799 11.722 10.799 9.067 10.799C5.76 10.8 22.24 10.8 18.933 10.799C17.74 10.799 16.166 10.799 16.166 10.799ZM10.4 10.799H17.6V15.111C17.6 16.536 17.6 17.248 17.067 17.782C16.534 18.316 15.822 18.316 14.4 18.316H13.6C12.178 18.316 11.466 18.316 10.933 17.782C10.4 17.248 10.4 16.536 10.4 15.111V10.799Z"
                        stroke="#EF4444"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2">
                  <span>Size: {productVariant.size.name}</span>
                  <span>Color: {productVariant.color.name}</span>
                </div>
                <p className="font-normal text-xs leading-5 text-gray-500 mb-2">
                  {product.description || "Mô tả sản phẩm."}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {/* Nút giảm số lượng */}
                    <button
                      className="group rounded-full border border-gray-200 shadow-sm p-2 bg-white hover:bg-gray-50"
                      onClick={() => handleDecrease(index)}
                      disabled={item.quantity <= 1} // Vô hiệu hóa nếu số lượng <= 1
                    >
                      <svg
                        className="stroke-gray-900"
                        width="14"
                        height="14"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 9.5H13.5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Hiển thị số lượng */}
                    <input
                      value={cartItems[index]?.quantity || ""}
                      className="border border-gray-200 rounded-full w-8 aspect-square text-gray-900 text-xs py-1 text-center"
                      min="1"
                      onChange={(event) => handleQuantityChange(index, event)} // Xử lý thay đổi số lượng
                      onBlur={(e) => {
                        const inputValue = parseInt(e.target.value, 10);
                        if (inputValue < 1 || isNaN(inputValue)) {
                          setErrorMessage("Số lượng phải lớn hơn hoặc bằng 1");

                          setCartItems((prevItems) =>
                            prevItems.map((item, i) => {
                              if (i === index) {
                                return { ...item, quantity: 1 };
                              }
                              return item;
                            })
                          );
                        }
                      }}
                      onInput={(e) => {
                        // Lấy giá trị khi người dùng đang nhập
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          // Chỉ cho phép nhập số
                          setCartItems((prevItems) =>
                            prevItems.map((item, i) => {
                              if (i === index) {
                                return {
                                  ...item,
                                  quantity: parseInt(value) || 0,
                                };
                              }
                              return item;
                            })
                          );
                        }
                      }}
                    />

                    {/* Nút tăng số lượng */}
                    <button
                      className="group rounded-full border border-gray-200 shadow-sm p-2 bg-white hover:bg-gray-50"
                      onClick={() => handleIncrease(index)}
                      disabled={item.quantity >= item.product_variant.stock} // Khóa nút nếu số lượng >= tồn kho
                    >
                      <svg
                        className="stroke-gray-900"
                        width="14"
                        height="14"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 9.5H14.25M9 14.75V4.25"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Hiển thị thông báo lỗi nếu có */}
                    {errorMessages[index] && (
                      <div className="text-red-500 text-xs">
                        {errorMessages[index]}
                      </div>
                    )}
                  </div>

                  <h6 className="text-red-500 font-manrope font-bold text-lg leading-6 text-right">
                    {formatCurrency(
                      totalPriceItem(productVariant?.price || 0, item.quantity)
                    )}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}

        <div className="w-2/12 ">
          <button
            onClick={handleCheckout}
            className="rounded-full py-2 px-4 bg-gray-600 text-white text-base w-full transition-all hover:bg-gray-700"
          >
            Thanh toán
          </button>
        </div>
      </div>
      <ToastContainer className={`mt-[30px]`} />
    </section>
  );
};

export default Cart;
