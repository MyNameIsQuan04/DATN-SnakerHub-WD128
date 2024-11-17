import { Category } from "./Category";
import { Color } from "./Color";
import { Gallery } from "./Gallery";
import { Size } from "./Size";

// Product Interface
export interface Product {
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
  variants: product_variants[];
}

export interface product_variants {
  id: number;
  product_id: number;
  color: Color;
  size: Size;
  color_id: number;
  size_id: number;
  sku: string;
  price: number;
  stock: number;
  image: File;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product: Product;
}

// export interface Product {
//   id: number | string;
//   name: string;
//   category: Category;
//   thumbnail: any;
//   price: number;
//   description: string;
//   product_variants: product_variants[];
// }

// export interface product_variants {
//   id: number;
//   size: Size;
//   color: Color;
//   price: number;
//   stock: number;
//   sku: string;
//   images: string[];
// }

// export interface crud_product_variants {
//   id: number;
//   size_id: number;
//   color_id: number;
//   color: Color;
//   size: Size;
//   price: number;
//   stock: number;
//   sku: string;
//   images: File[];
// }
// export interface crud_Product {
//   id: number | string;
//   name: string;
//   category_id: number;
//   category: Category;
//   thumbnail: any;
//   price: number;
//   description: string;
//   variants: crud_product_variants[];
// }

// export interface FormProduct_variants {
//   size_id: Size;
//   color_id: Color;
//   price: number;
//   stock: number;
//   sku: string;
//   images: File[];
// }

// export interface FormProductData {
//   name: string;
//   category_id: Category;
//   thumbnail: any;
//   price: number;
//   description: string;
//   variants: FormProduct_variants[];
// }

// --------------------------------------------------------------------
