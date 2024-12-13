import { Category } from "./Category";
import { Color } from "./Color";
import { Gallery } from "./Gallery";
import { Size } from "./Size";
import { IUser } from "./User";

// Product Interface
export interface Product {
  product(product: any): unknown;
  id?: number;
  category: Category;
  category_id: number;
  name: string;
  description: string;
  short_description: string;
  price: number;
  thumbnail: string;
  sales_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  galleries: Gallery[];
  product_variants: product_variants[];
}

export interface Rate {
  user_id: number;
  product_id: number;
  order__item_id: number;
  id: number;
  content: string;
  star: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: IUser;
  product: Product;
}

export interface product_variants {
  id: number;
  product_id: number;
  name: string;
  color: Color;
  size: Size;
  color_id: number;
  size_id: number;
  sku: string;
  price: number;
  stock: number;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product: Product;
}

