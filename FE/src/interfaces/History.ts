export interface History {
  id: number;
  user: string;
  table_name: string;
  record_id: number;
  action: string;
  old_data: any;
  new_data: any;
  created_at: string;
  updated_at: string;
}
