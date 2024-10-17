import { Category } from "./Category";
import { Color } from "./Color";
import { Size } from "./Size";

export interface Product {
  id: number | string;
  name: string;
  category: Category;
  thumbnail: any;
  price: number;
  description: string;
  product_variants: product_variants[];
}

export interface product_variants {
  id: number;
  size: Size;
  color: Color;
  price: number;
  stock: number;
  sku: string;
  images: string[];
}

export interface crud_product_variants {
  id: number;
  size_id: number;
  color_id: number;
  color: Color;
  size: Size;
  price: number;
  stock: number;
  sku: string;
  images: File[];
}
export interface crud_Product {
  id: number | string;
  name: string;
  category_id: number;
  category: Category;
  thumbnail: any;
  price: number;
  description: string;
  variants: crud_product_variants[];
}

export interface FormProduct_variants {
  size_id: Size;
  color_id: Color;
  price: number;
  stock: number;
  sku: string;
  images: File[];
}

export interface FormProductData {
  name: string;
  category_id: Category;
  thumbnail: any;
  price: number;
  description: string;
  variants: FormProduct_variants[];
}
