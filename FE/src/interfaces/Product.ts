export interface Product {
  id: number | string;
  name: string;
  category: string;
  thumbnail: any;
  variants: ProductVariant[];
}

export interface ProductVariant {
  size: string;
  color: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
}
