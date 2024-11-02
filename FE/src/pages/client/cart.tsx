import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartItem } from "../../interfaces/Cart";
import { useNavigate } from "react-router-dom";
import { CartCT } from "../../contexts/CartContext";
import api from "../../configs/axios";

type Props = {};

const Cart = (props: Props) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("access_token");

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
    }
  };

  const handleIncrease = (index: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          const newQuantity = item.quantity + 1;
          updateCartItemQuantity(item.id, newQuantity);
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
          const newQuantity = item.quantity - 1;
          updateCartItemQuantity(item.id, newQuantity); // Cập nhật backend
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get("list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);

        if (response.data.success && response.data.cart?.cart__items) {
          setCartItems(response.data.cart.cart__items);
          setSelectedItems(
            response.data.cart.cart__items.map((item: CartItem) => item.id)
          ); // Chọn tất cả sản phẩm mặc định
        } else {
          setCartItems([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  const totalPriceItem = (price: number, quantity: number) => price * quantity;

  const handleRemoveItem = async (id: number) => {
    const confirm = window.confirm("Xoa ?");

    if (confirm) {
      try {
        await api.delete(`destroy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);

        if (response.data.success && response.data.cart?.cart__items) {
          setCartItems(response.data.cart.cart__items);
          setSelectedItems(
            response.data.cart.cart__items.map((item: CartItem) => item.id)
          );
        } else {
          setCartItems([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      navigate("/checkout", { state: { selectedItems } });
    } else {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
    }
  };

  if (loading) {
    return <div>Đang tải giỏ hàng...</div>;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <div className="mt-[300px] px-[100px]">Giỏ hàng trống.</div>;
  }

  return (
    <div className="mt-[400px] px-[150px]">
      <div className="flex">
        <p className="text-[14px]">TRANG CHU</p>
        <p className="text-[14px] px-[4px]"> | </p>
        <p className="text-[14px]">GIO HANG</p>
      </div>

      <div className="border border-[#f3f3f3] mt-[30px]">
        <div className="flex *:text-[14px] *:text-center px-[10px] *:text-[#888888] my-[10px]">
          <p className="w-[550px]">SẢN PHẨM</p>
          <p className="w-[178px]">ĐƠN GIÁ</p>
          <p className="w-[177px]">SỐ LƯỢNG</p>
          <p className="w-[150px]">SỐ TIỀN</p>
          <p className="w-[146px]">THAO TÁC</p>
        </div>
      </div>
      <div className="border border-[#c9c9c9] px-[10px] mt-[20px] *:text-[14px] ">
        {cartItems.map((item, index) => {
          const productVariant = item.product_variant;
          const product = productVariant.product;
          return (
            <div key={item.id} className="">
              <div className="flex my-[20px]">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="mr-2"
                />
                <div className="w-[550px]">
                  <div className="flex justify-center items-center gap-[30px]">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="w-[100px] h-[100px]"
                    />
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[170px]">
                      {product.name}
                    </p>
                    <p className="text-[#0000008A]">
                      Màu {productVariant.color.name}, Kích cỡ:{" "}
                      {productVariant.size.name}
                    </p>
                  </div>
                </div>
                <div className="w-[178px] flex justify-center items-center gap-[10px] h-[100px]">
                  <span className="line-through">{productVariant.price}đ</span>
                  <span>{productVariant.price} đ</span>
                </div>
                <div className="w-[177px] flex justify-center items-center h-[100px]">
                  <div className="flex items-center justify-center mx-auto w-[114px] h-[32px] border border-[#c9c9c9]">
                    <button
                      onClick={() => handleDecrease(index)}
                      className="h-[32px] w-[32px] border-r"
                    >
                      -
                    </button>
                    <span className="mx-[21px] text-[16px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(index)}
                      className="h-[32px] w-[32px] border-l"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-[150px] flex justify-center items-center">
                  <span className="text-red-500">
                    {totalPriceItem(productVariant.price, item.quantity)} đ
                  </span>
                </div>
                <div className="w-[146px] flex justify-center items-center">
                  <svg
                    onClick={() => handleRemoveItem(item.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21a48.108 48.108 0 01-3.478-.397M4.772 5.79a48.108 48.108 0 013.478-.397M18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79"
                    />
                  </svg>
                </div>
              </div>
              <hr className="mb-[10px]" />
            </div>
          );
        })}
      </div>
      <button onClick={handleCheckout} className="btn">
        Thanh toán
      </button>
    </div>
  );
};

export default Cart;
