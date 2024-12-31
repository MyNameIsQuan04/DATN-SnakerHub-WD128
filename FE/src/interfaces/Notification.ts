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
  
  export interface Notification extends Review {
    type: string;
  }
  