import React, { useEffect, useState } from "react";
import axios from "axios";

type CartItem = {
  id: number; // Chú ý: id là number chứ không phải string
  quantity: number;
  product_variant: {
    product_id: number;
    color: {
      id: number;
      name: string;
    };
    size: {
      id: number;
      name: string;
    };
    price: number;
    product: {
      id: number;
      name: string;
      thumbnail: string;
    };
  } | null; // Thêm null vào đây để phù hợp với kiểu dữ liệu
};

type Props = {};

const Cart = (props: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);

        if (
          response.data.success &&
          response.data.cart &&
          response.data.cart.cart__items
        ) {
          setCartItems(response.data.cart.cart__items);
          console.log(response.data.cart.cart__items);
        } else {
          console.error("Không tìm thấy cart__items trong dữ liệu trả về.");
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

  const handleRemoveItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  if (loading) {
    return <div>Đang tải giỏ hàng...</div>;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <div>Giỏ hàng trống.</div>;
  }

  return (
    <div className="container mx-auto mt-[300px] px-[100px]">
      <h1 className="text-2xl font-semibold mb-5">Giỏ Hàng Của Bạn</h1>
      {cartItems.map((item) => {
        const productVariant = item.product_variant;

        // Kiểm tra xem productVariant có tồn tại không
        if (!productVariant) {
          return (
            <div
              key={item.id}
              className="flex justify-between items-center mb-5"
            >
              <p className="text-red-600">Sản phẩm không còn nữa.</p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Xóa
              </button>
            </div>
          );
        }

        const product = productVariant.product;

        return (
          <div key={item.id} className="flex justify-between items-center mb-5">
            <div className="flex items-center">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-20 h-20 rounded-md"
              />
              <div className="ml-4">
                <p className="text-lg">{product.name}</p>
                <p className="text-sm text-gray-600">
                  Số lượng: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Màu: {productVariant.color.name}
                </p>
                <p className="text-sm text-gray-600">
                  Kích thước: {productVariant.size.name}
                </p>
                <p className="text-sm text-red-600">
                  {productVariant.price.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Xóa
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
