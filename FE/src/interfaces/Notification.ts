export interface Review {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}


export interface Notification {
  id: number;
  type: string;
  status: string;
  created_at: string;
  note?: string;
  order_code?: string; 
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

}
