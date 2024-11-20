import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Size } from "../interfaces/Size";
import { Color } from "../interfaces/Color";
import {
  addColor,
  getColors,
  removeColor,
  updateColor,
} from "../services/color";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: React.ReactNode;
};
export const ColorCT = createContext({} as any);

const ColorContext = ({ children }: Props) => {
  const [colors, setColors] = useState<Color[]>([]);
  const router = useNavigate();

  // Hàm lấy danh sách màu
  const fetchColors = async () => {
    try {
      const data = await getColors();
      setColors(data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách màu");
    }
  };

  // Gọi hàm fetchColors khi component mount
  useEffect(() => {
    fetchColors();
  }, []);

  const onRemoveColor = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa?");
    if (confirm) {
      try {
        await removeColor(id);
        toast.success("Xóa màu thành công");
        // Cập nhật lại state sau khi xóa
        const newColorsAfterDelete = colors.filter((color) => color.id !== id);
        setColors(newColorsAfterDelete);
      } catch (error) {
        toast.error("Lỗi khi xóa màu");
      }
    }
  };

  const onAddColor = async (data: Size) => {
    try {
      const color = await addColor(data);
      toast.success("Thêm màu thành công");
      // Cập nhật lại state colors với màu mới thêm
      setColors([...colors, color]);
      // Điều hướng về trang quản lý màu mà không cần reload
      router("/admin/color");
    } catch (error) {
      toast.error("Lỗi khi thêm màu");
    }
  };

  const onUpdateColor = async (data: Size, id: number) => {
    try {
      const color = await updateColor(data, id);
      toast.success("Cập nhật màu thành công");
      // Cập nhật lại state colors sau khi chỉnh sửa
      const newColorsAfterUpdate = colors.map((pro) =>
        pro.id === id ? color : pro
      );
      setColors(newColorsAfterUpdate);
      router("/admin/color");
    } catch (error) {
      toast.error("Lỗi khi cập nhật màu");
    }
  };

  return (
    <div>
      <ColorCT.Provider
        value={{ colors, onAddColor, onRemoveColor, onUpdateColor }}
      >
        {children}
      </ColorCT.Provider>
      {/* Toast Container để hiển thị thông báo */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ColorContext;
