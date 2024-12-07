import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Size } from "../interfaces/Size";
import {
  addSize,
  getSizes,
  removeSize,
  updateSize,
} from "../services/admin/size";

type Props = {
  children: React.ReactNode;
};
export const SizeCT = createContext({} as any);
const SizeContext = ({ children }: Props) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const router = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await getSizes();
      setSizes(data);
    })();
  }, []);
  const onRemoveSize = async (id: number) => {
    const confirm = window.confirm("Xoa ?");
    if (confirm) {
      try {
        await removeSize(id);
        alert("Thanh cong");
        const newSizesAfterDelete = sizes.filter((size) => size.id !== id);
        setSizes(newSizesAfterDelete);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onAddSize = async (data: Size) => {
    try {
      const size = await addSize(data);
      alert("Thanh cong");
      setSizes([...sizes, size]);
      router("/admin/size");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateSize = async (data: Size, id: number) => {
    try {
      console.log(data, id);
      const size = await updateSize(data, id);
      alert("Thanh cong");
      const newSizesAfterUpdate = sizes.map((pro) =>
        pro.id == id ? size : pro
      );
      setSizes(newSizesAfterUpdate);
      router("/admin/size");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <SizeCT.Provider value={{ sizes, onUpdateSize, onAddSize, onRemoveSize }}>
        {children}
      </SizeCT.Provider>
    </div>
  );
};

export default SizeContext;
