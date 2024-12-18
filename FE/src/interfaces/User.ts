
export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string; // Để xác nhận lại mật khẩu khi cập nhật
  address?: string;
  phone_number?: string;
  gender?: "male" | "female" | "other"; // Tùy chọn giới tính với các giá trị cố định
  birthday?: string; // Định dạng ngày sinh, có thể là 'YYYY-MM-DD' hoặc định dạng tùy ý
  avatar?: string; // Đường dẫn URL đến ảnh đại diện
  type?: "admin" | "user" | "guest"; // Kiểu người dùng
  created_at: string; 
  update_at:string;
  isLocked: boolean; 
  deleted_at?: null | string
}
