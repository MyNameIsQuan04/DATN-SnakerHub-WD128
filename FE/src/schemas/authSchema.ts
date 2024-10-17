import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
    email: z.string().email(),
    phone: z
      .string()
      .min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" }),
    address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password và confirm password phải giống nhau",
    path: ["confirmPassword"],
  });
export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  avatar: z.string(),
});
