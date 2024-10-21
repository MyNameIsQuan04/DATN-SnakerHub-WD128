export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone_number?: string;
  avatar?: string;
  type?: "admin" | "user" | "guest";
  confirmPassword?: string;
  isLocked?: boolean; // Thêm thuộc tính để quản lý trạng thái khóa
}
