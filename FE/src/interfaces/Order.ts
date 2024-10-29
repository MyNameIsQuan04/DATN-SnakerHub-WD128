import { product_variants } from "./Product";

export interface Customer {
  id: number;
  user_id: number;
  name: string;
  phone_number: string;
  address: string;
  email?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product__variant_id: number;
  quantity: number;
  price: number;
  created_at : string;
  product_variant: product_variants[];
}

export interface Order {
  id: number;
  total_price: number;
  status: string;
  customer_id: number;
  customer: Customer;
  order_items: OrderItem[];
  created_at: string;
}
