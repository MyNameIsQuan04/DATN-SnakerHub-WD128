import daisyui from "daisyui"; // Sử dụng import thay vì require
import tailwindScrollbarHide from "tailwind-scrollbar-hide"; // Sử dụng import thay vì require

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Tạo phạm vi tìm kiếm cho các class
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"], // Đặt font chữ mặc định
      },
      // Thêm các tùy chỉnh cho việc ẩn thanh cuộn
      scrollbarWidth: {
        none: "none", // Tạo lớp cho việc ẩn scrollbar ở Firefox
      },
      // Thêm các lớp custom cho việc ẩn scrollbar trên các trình duyệt Webkit (Chrome, Safari, Edge)
      extend: {
        // Cấu hình thêm một số lớp CSS tuỳ chỉnh cho scrollbar
        scrollbarHide: tailwindScrollbarHide,
      },
    },
  },
  plugins: [daisyui, tailwindScrollbarHide], // Đảm bảo DaisyUI và plugin scrollbar-hide được thêm vào
  daisyui: {
    themes: ["light"], // Đặt giao diện mặc định là "light"
  },
};
