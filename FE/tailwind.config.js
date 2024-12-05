import daisyui from "daisyui"; // Sử dụng import thay vì require

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Tạo phạm vi tìm kiếm cho các class
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"], // Đặt font chữ mặc định
      },
    },
  },
  plugins: [daisyui], // Đảm bảo DaisyUI đã được thêm
  daisyui: {
    themes: ["light"], // Đặt giao diện mặc định là "light"
  },
};
