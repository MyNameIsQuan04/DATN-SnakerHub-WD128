import React, { createContext, useEffect, useState } from "react";
import api from "../configs/axios";
import { CartItem } from "../interfaces/Cart";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const CartCT = createContext({} as any);
const CartContext = ({ children }: Props) => {
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
  return (
    <CartCT.Provider
      value={{
        cartItems,
        selectedItems,
        loading,
        handleSelectItem,
        handleIncrease,
        handleDecrease,
        handleRemoveItem,
        totalPriceItem,
        token,
        setCartItems,
        setSelectedItems,
        setLoading,
      }}
    >
      {children}
    </CartCT.Provider>
  );
};

export default CartContext;
