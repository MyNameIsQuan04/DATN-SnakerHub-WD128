export type CartItem = {
  id: number; // Chú ý: id là number chứ không phải string
  quantity: number;
  product_variant: {
    id: number;
    product_id: number;
    color: {
      id: number;
      name: string;
    };
    size: {
      id: number;
      name: string;
    };
    price: number;
    product: {
      id: number;
      name: string;
      thumbnail: string;
      description: string;
    };
  };
};
