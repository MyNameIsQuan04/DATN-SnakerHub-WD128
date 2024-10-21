import React, { useEffect, useState } from "react";

type Props = {};

const Cart = (props: Props) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return <div>Giỏ hàng trống</div>;
  }
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">Giỏ Hàng Của Bạn</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <img src={item.thumbnail} alt={item.name} className="w-20 h-20" />
            <div className="ml-4">
              <p className="text-lg">{item.name}</p>
              <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
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
