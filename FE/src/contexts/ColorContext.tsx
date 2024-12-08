import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Color } from "../interfaces/Color";
import {
  addColor,
  getColors,
  removeColor,
  updateColor,
} from "../services/admin/color";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};
export const ColorCT = createContext({} as any);
const ColorContext = ({ children }: Props) => {
  const [colors, setColors] = useState<Color[]>([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await getColors();
      setColors(data);
    })();
  }, []);
  const onRemoveColor = async (id: number) => {
    const confirm = window.confirm("Xoa ?");
    if (confirm) {
      try {
        await removeColor(id);
        toast.success("Xóa thành công");
        const newColorsAfterDelete = colors.filter((color) => color.id !== id);
        setColors(newColorsAfterDelete);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onAddColor = async (data: Color) => {
    try {
      const color = await addColor(data);
      toast.success("Thêm thành công");
      setColors([...colors, color]);
      router("/admin/color");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateColor = async (data: Color, id: number) => {
    try {
      console.log(data, id);
      const color = await updateColor(data, id);
      toast.success("Cập nhật thành công");
      const newColosAfterUpdate = colors.map((pro) =>
        pro.id == id ? color : pro
      );
      setColors(newColosAfterUpdate);
      router("/admin/color");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ToastContainer />
      <ColorCT.Provider
        value={{ colors, onAddColor, onRemoveColor, onUpdateColor }}
      >
        {children}
      </ColorCT.Provider>
    </div>
  );
};

export default ColorContext;
