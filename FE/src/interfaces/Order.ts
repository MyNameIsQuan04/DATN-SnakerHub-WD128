import { Product, product_variants } from "./Product";
import { IUser } from "./User";
export interface Order {
  size: string;
  price: number;
  color: string;
  customer_id: number;
  id: number;
  total_price: number;
  status: string;
  note: string;
  reason: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  order_code: string;
  status_payment: string;
  codeDiscount: string;
  discount: number;
  shippingFee: number;
  totalAfterDiscount: number;
  paymentMethod: string;
  customer: Customer;
  order_items: OrderItem[];

  paymentURL: string;
  timestamp: string;
  product_variant?: Product;
  isNew: boolean;
}
export interface Customer {
  user: IUser;
  user_id: number;
  id: number;
  name: string;
  phone_number: number;
  address: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OrderItem {
  productVariantImage: string;
  nameProduct: string;
  productVariantImage: string;
  order_id: number;
  product_variant_id: number;
  id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product_variant: product_variants;
  size: string;
  price: number;
  color: string;
}
