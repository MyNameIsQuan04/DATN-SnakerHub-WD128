import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"], // Đặt font chữ mặc định
      },
    },
  },
  plugins: [
    daisyui, // Thêm DaisyUI vào danh sách plugins
  ],
  daisyui: {
    themes: ["light"], // Chỉ sử dụng theme sáng
    darkTheme: "light", // Đặt theme mặc định cho chế độ dark mode
    base: true, // Bật style cơ bản nếu cần
    styled: true, // Giữ style mặc định của các component
    logs: true, // Hiển thị log khi build
  },
};
