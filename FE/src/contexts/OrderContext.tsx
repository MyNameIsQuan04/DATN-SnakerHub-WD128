import React, { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartItem } from "../interfaces/Cart";
import { useDistricts, useProvinces, useWards } from "../apis/locations";
import api from "../configs/axios";
import { Order } from "../interfaces/Order";

type Props = {
  children: React.ReactNode;
};
export const OrderCT = createContext({} as any);
const OrderContext = ({ children }: Props) => {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const token = localStorage.getItem("access_token");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const fetchCheckoutItems = async () => {
    console.log(selectedItems);
    try {
      const response = await api.get("list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.data.success && response.data.cart?.cart__items) {
        const items = response.data.cart.cart__items.filter((item: CartItem) =>
          selectedItems.includes(item.id)
        );

        console.log(items);

        setCheckoutItems(items);
        setCartItems(items);
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm thanh toán:", error);
      setLoading(false);
    }
  };
  const grandTotalPrice = checkoutItems.reduce(
    (total, item) => total + item.product_variant.price * item.quantity,
    0
  );
  const totalPriceItem = (price: number, quantity: number) => price * quantity;

  const onAddOrder = async (data: any) => {
    const orderData = {
      ...data,
      province: selectedProvince,
      district: selectedDistrict,
      town: selectedWard,
      items: cartItems.map((item: any) => ({
        product__variant_id: item.product_variant.id,
        quantity: item.quantity,
        price: item.product_variant.price,
        total: totalPriceItem(item.product_variant.price, item.quantity),
      })),
      total_price: grandTotalPrice,
    };
    try {
      const response = await api.post("client/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        alert("Đặt hàng thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng.");
    }
  };
  return (
    <OrderCT.Provider
      value={{
        checkoutItems,
        fetchCheckoutItems,
        selectedDistrict,
        selectedProvince,
        cartItems,
        selectedWard,
        loading,
        grandTotalPrice,
        token,
        setSelectedDistrict,
        setSelectedProvince,
        setSelectedWard,
        onAddOrder,
      }}
    >
      {children}
    </OrderCT.Provider>
  );
};

export default OrderContext;
