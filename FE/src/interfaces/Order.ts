// export interface Customer {
//   id: number;
//   user_id: number;
//   name: string;
//   phone_number: string;
//   address: string;
//   email?: string;
// }

// export interface Product {
//   product_variants: ProductVariant[];
//   id: number;
//   category_id: number;
//   name: string;
//   description: string;
//   price: number;
//   thumbnail: string;
// }

// export interface ProductVariant {
//   id: number;
//   product_id: number;
//   color_id: number;
//   size_id: number;
//   price: number;
//   stock: number;
//   sku: string;
//   images: string[];
//   product: Product;
// }

// export interface OrderItem {
//   id: number;
//   order_id: number;
//   product__variant_id: number;
//   quantity: number;
//   price: number;
//   product_variant: ProductVariant;
//   created_at: string;
//   updated_at: string;
//   deleted_at?: string | null;
// }

// export interface Order {
//   id: number;
//   total_price: number;
//   status: string;
//   customer_id: number;
//   customer: Customer;
//   order_items: OrderItem[];
// }
