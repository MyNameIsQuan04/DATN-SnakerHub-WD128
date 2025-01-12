

export interface Notification {
  reason? : string
  id: number;
  type: string;
  status: string;
  created_at: string;
  note?: string;
  order_code?: string;
  updated_at: string; 
  product_variant?: {
    thumbnail?: string;
    galleries?: { url: string }[];
  };
  product?: {
    name: string;
  };
  customer?: {
    name: string;
  };
  order_items: {

    image: string;

  }[];
}
