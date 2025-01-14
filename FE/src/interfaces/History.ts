export interface History {
  id: number;
  user_id: number;
  table_name: string;
  record_id: number;
  action: string;
  old_data: any;
  new_data: any;
  created_at: string;
  updated_at: string;
}
