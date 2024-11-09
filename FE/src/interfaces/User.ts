// export interface IUser {
//   id?: string ;
//   name?: string;
//   email?: string;
//   password?: string;
//   address?: string;
//   phone_number?: string;
//   gender? : "male" | "female" | "other" | undefined;
//   birthday? : string;
//   avatar?: string;
//   type?: "admin" | "user" | "guest";
//   confirmPassword?: string;
//   created_at: string;
//   isLocked: boolean; // Thêm thuộc tính để quản lý trạng thái khóa
// }
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
  created_at: string; // Ngày tạo tài khoản, bắt buộc
  isLocked: boolean; // Trạng thái khóa tài khoản, bắt buộc
}
