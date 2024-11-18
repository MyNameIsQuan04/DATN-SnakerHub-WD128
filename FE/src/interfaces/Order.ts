
import {  product_variants } from "./Product";
export interface Order {
  customer_id: number;
  id: number;
  total_price: number;
  status: string;
  note: string
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  customer: Customer;
  order_items: OrderItem[];
  order_code : string
}

export interface Customer {
  user_id: number;
  id: number;
  name: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OrderItem {
  order_id: number;
  product_variant_id: number;
  id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product_variant: product_variants;
}


