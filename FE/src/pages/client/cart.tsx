import React, { useEffect, useState } from "react";
import axios from "axios";

type CartItem = {
  id: string;
  name: string;
  thumbnail: string;
  quanlity: number;
  color: string;
  size: string;
  price: number;
};

type Props = {};

const Cart = (props: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/shop/cart");
        setCartItems(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/shop/cart/store/${id}`);
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  if (loading) {
    return <div>Đang tải giỏ hàng...</div>;
  }

  if (cartItems.length === 0) {
    return <div>Giỏ hàng trống</div>;
  }

  return (
    <div className="container mx-auto mt-[300px] px-[100px]">
      <h1 className="text-2xl font-semibold mb-5">Giỏ Hàng Của Bạn</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <img src={item.thumbnail} alt={item.name} className="w-20 h-20" />
            <div className="ml-4">
              <p className="text-lg">{item.name}</p>
              <p className="text-sm text-gray-600">Số lượng: {item.quanlity}</p>
              <p className="text-sm text-gray-600">Màu: {item.color}</p>
              <p className="text-sm text-gray-600">Kích thước: {item.size}</p>
              <p className="text-sm text-red-600">{item.price} VND</p>
            </div>
          </div>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
