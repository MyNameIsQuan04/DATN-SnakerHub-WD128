export interface Customer {
    id: number;
    name: string;
    phone_number: string;
    address: string;
    email?: string; // Nếu có email trong dữ liệu
  }
  
  export interface OrderItem {
    id: number;
    order_id: number;
    product__variant_id: number;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    id: number;
    total_price: number;
    status: string;
    customer: Customer;
    order_items: OrderItem[];
    created_at: string;
    updated_at: string;
  }
  