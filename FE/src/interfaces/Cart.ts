export type CartItem = {
  id: number; // Chú ý: id là number chứ không phải string
  quantity: number;
  product_variant: {
    image: string;
    id: number;
    product_id: number;
    color: string;
    size: number;
    price: number;
    product: {
      id: number;
      name: string;
      thumbnail: string;
      description: string;
    };
    stock: number;
  };
};
