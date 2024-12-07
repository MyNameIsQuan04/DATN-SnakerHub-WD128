
import {  product_variants } from "./Product";
import { IUser } from "./User";
export interface Order {
  customer_id: number;
  id: number;
  total_price: number;
  status: string;
  note: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  order_code: string;
  status_payment: string; // Adjusted to match "status-payment" key
  customer: Customer;
  order_items: OrderItem[];
}

export interface Customer {
  user : IUser
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
  product_variant_id: number; // Corrected "product__variant_id"
  id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product_variant: product_variants;
}



