export interface Product {
  id: number | string;
  name: string;
  category_id: string;
  thumbnail: any;
  variants: ProductVariant[];
}

export interface ProductVariant {
  size_id: string | number;
  color_id: string | number;
  price: number;
  stock: number;
  sku: string;
  images: string[];
}

export interface FormProductData {
  name: string;
  category_id: string;
  thumbnail: any;
  variants: ProductVariant[];
}
